import { Request, Response } from "express";

import { Story } from "../database/models";
import { IStory } from "../../utils/types";

interface StoryPath {
    storyId: string
}
type StoryResponse = Story | Story[] | { message: string, error?: string }

export const getStory = async (request: Request<StoryPath>, response: Response<StoryResponse>) => {
    const { storyId } = request.params;

    const story = await Story.findOne({ where: { storyId: Number(storyId) } });

    if (!story) {
        return response.status(404).json({ message: 'This story could not be found' });
    }
    return response.status(200).json(story)
};

export const getReadingList = async (request: Request, response: Response<StoryResponse>) => {

    try {
        const readingList = await Story.findAll({ where: { readStatus: 'reading-list' } });
        return response.status(200).json(readingList);
    }
    catch(error) {
        console.error('An error occurred getting the reading list');
        console.error(error);
        return response.status(500).json({ message: 'An internal error occurred getting the reading list' });
    }
};

export const getCompleteList = async (request: Request, response: Response<StoryResponse>) => {

    try {
        const completedList = await Story.findAll({ where: { readStatus: 'complete' } });
        return response.status(200).json(completedList);
    }
    catch(error) {
        console.error('An error occurred getting the completed reading list');
        console.error(error);
        return response.status(500).json({ message: 'An internal error occurred getting the completed reading list' });
    }
};

export const updateStory = async (request: Request<StoryPath, {}, IStory>, response: Response<StoryResponse>) => {
    const { storyId } = request.params;

    const story = await Story.findOne({ where: { storyId } });

    if (!story) {
        return response.status(404).json({ message: 'This story could not be found' });
    }

    const updatedStory = await story.update(request.body);
    return response.status(200).json(updatedStory);
};

export const updateReadingStatus = async(request: Request<StoryPath, {}, { status: string }>, response: Response<StoryResponse>) => {
    const { storyId } = request.params;

    const story = await Story.findOne({ where: { storyId } });

    if (!story) {
        return response.status(404).json({ message: 'This story could not be found' });
    }

    const status = request.body.status;
    if (!status || (status !== 'shelf' && status !== 'reading-list' && status !== 'completed')) {
        return response.status(400).json({ message: 'The status provided is not valid' });
    }

    const updatedStory = await story.update({ readStatus: request.body.status });
    return response.status(200).json(updatedStory);
};

export const deleteStory = async (request: Request<StoryPath>, response: Response<StoryResponse>) => {
    const { storyId } = request.params;

    const story = await Story.findOne({ where: { storyId } });

    if (!story) {
        return response.status(404).json({ message: 'This story could not be found' });
    }

    await story.destroy();
    return response.status(204).send();
};