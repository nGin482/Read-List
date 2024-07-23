import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { config } from "dotenv";

import { Story, Collection, CollectionStories } from "./models";
import { getAllFiles } from "../utils/utils";
import { IArchiveStories, ICollection, IStory } from "../../utils/types";

config();
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(timezone);
dayjs.extend(utc);

const collections = getAllFiles();

const sortCollections = (a: ICollection, b: ICollection) => {
    if (dayjs(a.date, 'DD-MM-YYYY').isAfter(dayjs(b.date, 'DD-MM-YYYY'), 'd')) {
        return 1;
    }
    else if (dayjs(a.date, 'DD-MM-YYYY').isBefore(b.date), 'd') {
        return -1;
    }
    return 0;
};

collections.sort(sortCollections);


let collectionDate: Dayjs;
const formatStory = (story: IStory) => {
    Object.assign(story, { storyId: story.storyID });
    delete story.storyID;
    story.chapters = Number(story.chapters.toString().split('/')[0]);
    story.words = Number(story.words.toString().replaceAll(',', ''));
    story.updatedDate = dayjs(`${story.updatedDate}/${collectionDate.year()}`, 'DD/MM/YYYY').toDate();

    return story;
};
// CollectionStories.drop({ cascade: true });
// Collection.drop({ cascade: true });
// Story.drop({ cascade: true });
// Collection.sync();
// Story.sync();
// CollectionStories.sync();

const insertStories = (archive: IArchiveStories) => {
    let stories: IStory[] = [];
    if (Object.keys(archive).includes('AO3_URL') || Object.keys(archive).includes('FFN_URL')) {
        stories = archive.AO3_URL.map(formatStory).concat([...archive.FFN_URL?.map(formatStory) || []]);
    }
    else if (Object.keys(archive).includes('AO3') || Object.keys(archive).includes('FFN')) {
        stories = archive.AO3.map(formatStory).concat([...archive.FFN?.map(formatStory) || []]);
    }
    else if (Object.keys(archive).includes('stories')) {
        stories = archive.stories.map(formatStory);
    }
    else {
        throw Error(`Unable to process ${archive.fandom}`);
    }

    console.log('Inserting', stories.length, 'stories inserted for', archive.fandom);
    return stories;
};

const syncData = async () => {
    for (let i = 0; i < collections.length; i++) {
        const collection = collections[i];
        if (collection.date.toString() !== 'Invalid Date') {
            collectionDate = dayjs(collection.date, 'DD-MM-YYYY');
            console.log(collectionDate.format('DD-MM-YYYY'))
            let collectionStories: IStory[] = [];
            try {
                collectionStories = collection.stories.map(insertStories).flat();
                for (let i = 0; i < collectionStories.length; i++) {
                    await Story.upsert(collectionStories[i]);
                }
            }
            catch (error) {
                console.error('Error processing', collectionDate.format('DD-MM-YYYY'));
                console.error(error);
            }
            const newCollection = await Collection.create({ date: collectionDate.toDate() });
            console.log(collectionDate.format('DD-MM-YYYY'), 'inserted into table');
            const rows = collectionStories.map(story => ({ storyId: story.storyId, collectionId: newCollection.getDataValue('id') }));
            await CollectionStories.bulkCreate(rows);
            console.log('==================================================================')
        }
    }
};

syncData();

