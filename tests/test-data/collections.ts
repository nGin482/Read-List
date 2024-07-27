import { ICollection } from "../../utils/types";

export const collections: ICollection = {
    date: new Date(2021, 5, 6),
    stories: [
        {
            title: 'Test',
            author: 'Test author',
            archive: 'Archive of our Own',
            storyId: 12345678,
            summary: 'Test summary',
            fandoms: [
                'Code Geass'
            ],
            characters: [
                'Lelouch vi Britannia'
            ],
            relationships: [],
            chapters: 1,
            words: 5725,
            publishedDate: null,
            updatedDate: new Date,
            rating: 'Mature',
            status: 'Complete',
            categories: [],
            tags: [],
            warnings: [],
            url: '',
            collectedDate: null,
            readStatus: 'shelf',
            readDate: new Date
        }
    ]
};