import { Request, Response } from "express";

import { Collection, CollectionStories, Story } from "../database/models";
import { convertStringToDate } from "../utils";
import { ICollection, IStory } from "../../utils/types";


interface CreateCollectionPayload {
    date?: string | Date
    stories: IStory[]
}

type CollectionResponse = Collection | Collection[] | ICollection | { message: string, error?: string };

export const getAllCollections = async (request: Request<{}, {}, {}, { date: string }>, response: Response<CollectionResponse>) => {
    const { date } = request.query;
    console.log(date)
    if (date) {
        const parsedDate = convertStringToDate(date);
        const collection = await Collection.findOne({
            where: { date: parsedDate }
        });
        if (collection) {
            const stories = await collection.getStoriesForDate();
            return response.status(200).json({ date: parsedDate, stories });
        }
        else {
            return response.status(404).json({ message: `The collection for '${date}' could not be found` });
        }
    }
    else {
        const collections = await Collection.findAll();
    
        return response.status(200).json(collections)
    }
};

export const createCollection = async (request: Request<{}, {}, CreateCollectionPayload>, response: Response<CollectionResponse>) => {
    const { date, stories } = request.body;

    let collectionDate: string | Date;
    if (date) {
        if (typeof collectionDate === 'string') {
            try {
                collectionDate = convertStringToDate(collectionDate);
            }
            catch(error) {
                return response.status(500).json({
                    message: `The server is unable to understand the date given: ${date}`,
                    error: error.message
                });
            }
        }
    }
    else {
        collectionDate = new Date();
    }

    try {
        const newCollection = await Collection.create({ date: collectionDate });
    
        for (let i = 0; i < stories.length; i++) {
            await Story.upsert(stories[i]);
        }
    
        const collectionStories = stories.map(story => ({
            storyId: story.storyId,
            collectionId: newCollection.getDataValue('id')
        }));
        await CollectionStories.bulkCreate(collectionStories);
        
        return response.status(204).send();
    }
    catch(error) {
        return response.status(500).json({
            message: `There was a problem creating the collection for date '${date}'`,
            error: error.message
        });
    }
};

export const deleteCollection = async (request: Request<{ date: string }>, response: Response<CollectionResponse>) => {
    const { date } = request.params;

    const collection = await Collection.findOne({ where: { date: convertStringToDate(date) } });

    if (!collection) {
        return response.status(404).json({ message: `Unable to find a collection for '${date}'` })
    }

    await CollectionStories.destroy({ where: { collectionId: collection.id } });
    await collection.destroy();
    response.status(204).send();

};
