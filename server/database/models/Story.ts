import { DataTypes, Model } from "sequelize";

import { database } from "..";

interface StoryModel {
    storyId: number
    title: string
    author: string
    summary: string
    fandoms: string[]
    characters: string[]
    relationships: string[]
    chapters: number
    words: number
    publishedDate: Date
    updatedDate: Date
    status: 'In Progress' | 'Work in Progress' | 'Complete'
    rating: string
    archive: 'Fanfiction.Net' | 'Archive of our Own'
    url: string
    genres: string[]
    categories: string[]
    warnings: string[]
    tags: string[]
    readStatus: string
    readDate: Date
}

class Story extends Model<StoryModel> {
    declare storyId: number
    declare title: string
    declare author: string
    declare summary: string
    declare fandoms: string[]
    declare characters: string[]
    declare relationships: string[]
    declare chapters: number
    declare words: number
    declare publishedDate: Date
    declare updatedDate: Date
    declare status: 'In Progress' | 'Work in Progress' | 'Complete'
    declare rating: string
    declare archive: 'Fanfiction.Net' | 'Archive of our Own'
    declare url: string
    declare genres: string[]
    declare categories: string[]
    declare warnings: string[]
    declare tags: string[]
    declare readStatus: string
    declare readDate: Date
}

Story.init(
    {
        storyId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        author: {
            type: DataTypes.TEXT
        },
        summary: {
            type: DataTypes.TEXT
        },
        fandoms: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        },
        characters: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        },
        relationships: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        },
        chapters: {
            type: DataTypes.INTEGER
        },
        words: {
            type: DataTypes.INTEGER
        },
        publishedDate: {
            type: DataTypes.DATE
        },
        updatedDate: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.TEXT
        },
        rating: {
            type: DataTypes.TEXT
        },
        archive: {
            type: DataTypes.TEXT
        },
        url: {
            type: DataTypes.TEXT
        },
        readStatus: {
            type: DataTypes.TEXT
        },
        readDate: {
            type: DataTypes.DATE
        },
        genres: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        },
        categories: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        },
        warnings: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        }
    }, {
        sequelize: database,
        modelName: 'Story'
    }
);

export { Story };
