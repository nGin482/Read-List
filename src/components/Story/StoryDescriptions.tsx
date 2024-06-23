import { DescriptionsProps } from "antd";
import { IStory } from "../../utils/types";

const descriptionItems = (story: IStory): DescriptionsProps['items'] => [
    {
        key: 'author',
        label: 'Author',
        children: story.author,
        span: 4
    },
    {
        key: 'summary',
        label: 'Summary',
        children: story.summary,
        span: 4
    },
    {
        key: 'chapters',
        label: 'Chapters',
        children: story.chapters
    },
    {
        key: 'words',
        label: 'Words',
        children: story.words,
        span: 3
    },
    {
        key: 'fandoms',
        label: 'Fandoms',
        children: (
            <ul>
                {story.fandoms.map(fandom => <li>{fandom}</li>)}
            </ul>
        ),
        span: 3
    },
    {
        key: 'characters',
        label: 'Characters',
        children: (
            <ul>
                {story.characters.map(character => <li>{character}</li>)}
            </ul>
        ),
        span: 2
    },
    {
        key: 'relationships',
        label: 'Relationships',
        children: (
            story.relationships.length > 0 ? (
                <ul>
                    {story.relationships.map(ship => <li>{ship}</li>)}
                </ul>
            ) : (
                <p>No relationships were tagged</p>
            )
        ),
        span: 2
    },
    {
        key: 'publishedDate',
        label: 'Published Date',
        children: story.publishedDate,
        span: 2
    },
    {
        key: 'updateDate',
        label: 'Updated Date',
        children: story.updatedDate,
        span: 2
    },
    {
        key: 'status',
        label: 'Status',
        children: story.status,
        span: 1
    },
    {
        key: 'rating',
        label: 'Rating',
        children: story.rating,
        span: 2
    },
    {
        key: 'genres',
        label: 'Genres',
        children: (
            story.genres?.length > 0 ? (
                <ul>
                    {story.genres.map(genre => <li>{genre}</li>)}
                </ul>
            ) : (
                <p>No genres were tagged</p>
            )
        )
    },
    {
        key: 'categories',
        label: 'Categories',
        children: (
            story.categories?.length > 0 ? (
                <ul>
                    {story.categories.map(category => <li>{category}</li>)}
                </ul>
            ) : (
                <p>No categories were tagged</p>
            )
        )
    },
    {
        key: 'tags',
        label: 'Tags',
        children: (
            story.tags?.length > 0 ? (
                <ul>
                    {story.tags.map(tag => <li>{tag}</li>)}
                </ul>
            ) : (
                <p>No tags were tagged</p>
            )
        )
    }
];

export { descriptionItems }