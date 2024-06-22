export interface IStory {
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
    rating: string
    warnings: string[]
    genres: string[]
    categories: string[]
    tags: string[]
    readStatus: boolean
    dateRead: Date
    date: string
    status: string
    archive: string
    url: string
}

export interface IArchiveStories {
    fandom: string
    AO3_URL: IStory[]
    FFN_URL: IStory[]
}

export interface Collection {
    date: string
    stories: IArchiveStories[]
}