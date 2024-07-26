interface IBaseStory {
    storyId: number,
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
    collectedDate: Date
    readStatus: string
    readDate: Date
    rating: string
    status: 'In Progress' | 'Complete'
    url: string
}


export interface IFFNStory extends IBaseStory {
    genres: string[] 
    date: string
    archive: 'Fanfiction.Net'
}

export interface IAO3Story extends IBaseStory {
    categories: string[]
    tags: string[]
    warnings: string[]
    archive: 'Archive of our Own'
}

export type IStory = IFFNStory | IAO3Story

export interface Collection {
    date: Date
    stories?: IStory[]
}

export type SearchOptions = 'title' | 'fandoms';