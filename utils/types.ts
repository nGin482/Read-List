export interface FandomArchive {
    id: number
    name: string
    ffn_url: string
    ao3_url: string
    search: 'One' | 'Many'
    ignore_stories: string[]
}

interface IBaseStory {
    storyID?: number
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

export interface IArchiveStories {
    fandom: string
    AO3_URL: IStory[]
    FFN_URL: IStory[]
    stories: IStory[]
    FFN: IStory[]
    AO3: IStory[]
}

export interface ICollection {
    id?: number
    date: Date
    stories?: IArchiveStories[]
}

export interface ICharacter {
    id: number
    name: string
    fandom_id: number
}

export type SearchOptions = 'title' | 'fandoms';