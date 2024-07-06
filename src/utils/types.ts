interface IBaseStory {
    storyID: number,
    title: string
    author: string
    summary: string
    fandoms: string[]
    characters: string[]
    relationships: string[]
    chapters: number
    words: number
    publishedDate: string
    updatedDate: string
    collectedDate: Date
    readStatus: boolean
    dateRead: Date
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

export interface IArchiveStories {
    fandom: string
    AO3_URL: IStory[]
    FFN_URL: IStory[]
}

export interface Collection {
    date: string
    stories: IArchiveStories[]
}

export type SearchOptions = 'title' | 'fandoms';