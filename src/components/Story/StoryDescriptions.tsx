import { Button, DatePicker, Descriptions, DescriptionsProps, Input, Select, Typography } from "antd";
import dayjs from "dayjs";

import { IStory } from "../../utils/types";


const StoryDescriptions = ({ story, editing }: { story: IStory, editing: boolean }) => {
    console.log(editing)
    const { Text } = Typography;

    const handleChange = (field: string, value: string | string[]) => {
        console.log(field, value)
    };

    const descriptionItems: DescriptionsProps['items'] = [
        {
            key: 'author',
            label: 'Author',
            children: (
                editing
                ? (
                    <Input
                        defaultValue={story.author}
                        onChange={event => handleChange('author', event.currentTarget.value)}
                    />
                )
                : <Text>{story.author}</Text>
            ),
            span: 4
        },
        {
            key: 'summary',
            label: 'Summary',
            children: editing ? (
                <Input
                    defaultValue={story.summary}
                    onChange={event => handleChange('summary', event.currentTarget.value)}
                />
            ) : <Text>{story.summary}</Text>,
            span: 4
        },
        {
            key: 'chapters',
            label: 'Chapters',
            children: editing ? (
                <Input
                    defaultValue={story.chapters}
                    onChange={event => handleChange('chapters', event.currentTarget.value)}
                />
            ) : <Text>{story.chapters}</Text>
        },
        {
            key: 'words',
            label: 'Words',
            children: editing ? (
                <Input
                    defaultValue={story.words}
                    onChange={event => handleChange('words', event.currentTarget.value)}
                />
            ) : <Text>{story.words}</Text>,
            span: 3
        },
        {
            key: 'fandoms',
            label: 'Fandoms',
            children: (
                <>
                    {editing && (
                        <Select
                            mode="tags"
                            defaultValue={story.fandoms}
                            onChange={fandoms => handleChange('fandoms', fandoms)}
                        />
                    )}
                    {!editing && story.fandoms.length > 0 && (
                        <ul>
                            {story.fandoms.map(fandom => <li>{fandom}</li>)}
                        </ul>
                    )}
                    {!editing && story.fandoms.length === 0 && (
                        <Text>No fandoms were tagged</Text>
                    )}
                </>
            ),
            span: 3
        },
        {
            key: 'characters',
            label: 'Characters',
            children: (
                <>
                    {editing && (
                        <Select
                            mode="tags"
                            defaultValue={story.characters}
                            onChange={characters => handleChange('characters', characters)}
                        />
                    )}
                    {!editing && story.characters.length > 0 && (
                        <ul>
                            {story.characters.map(character => <li>{character}</li>)}
                        </ul>
                    )}
                    {!editing && story.characters.length === 0 && (
                        <Text>No characters were tagged</Text>
                    )}
                </>
            ),
            span: 2
        },
        {
            key: 'relationships',
            label: 'Relationships',
            children: (
                <>
                    {editing && (
                        <Select
                            mode="tags"
                            defaultValue={story.relationships}
                            onChange={ships => handleChange('relationships', ships)}
                        />
                    )}
                    {!editing && story.relationships.length > 0 && (
                        <ul>
                            {story.relationships.map(ship => <li>{ship}</li>)}
                        </ul>
                    )}
                    {!editing && story.relationships.length === 0 && (
                        <Text>No relationships were tagged</Text>
                    )}
                </>
            ),
            span: 2
        },
        {
            key: 'publishedDate',
            label: 'Published Date',
            children: editing ? (
                <DatePicker
                    defaultValue={story?.publishedDate ? dayjs(`${story?.publishedDate}/2022`, 'DD/MM/YYYY') : undefined}
                    onChange={date => handleChange('publishedDate', date.format('DD-MMMM-YYYY'))}
                    format="DD-MMM-YYYY"
                />
            ) : <Text>{story.publishedDate}</Text>,
            span: 2
        },
        {
            key: 'updateDate',
            label: 'Updated Date',
            children: editing ? (
                <DatePicker
                    defaultValue={dayjs(`${story.updatedDate}/2022`, 'DD/MM/YYYY')}
                    onChange={date => handleChange('updatedDate', date.format('DD-MMMM-YYYY'))}
                    format="DD-MMM-YYYY"
                />
            ) : <Text>{story.updatedDate}</Text>,
            span: 2
        },
        {
            key: 'status',
            label: 'Status',
            children: editing ? (
                <Select
                    defaultValue={ story.status }
                    options={[
                        { label: 'Work in Progress', value: 'Work in Progress' },
                        { label: 'Complete Work', value: 'Complete Work' }
                    ]}
                    onChange={value => handleChange('status', value)}
                />
            ) : <Text>{story.status}</Text>,
            span: 1
        },
        {
            key: 'rating',
            label: 'Rating',
            children: editing ? (
                <Select
                    options={[
                        { label: 'Archive of Our Own', options: [
                            { label: 'Teen And Up Audiences', value: 'Teen And Up Audiences' },
                            { label: 'General Audiences', value: 'General Audiences' },
                            { label: 'Explicit', value: 'Explicit' },
                            { label: 'Mature', value: 'Mature' },
                            { label: 'Not Rated', value: 'Not Rated' }
                        ]},
                        { label: 'Fanfiction.Net', options: [
                            { label: 'K -> T', value: 'K -> T' },
                            { label: 'K -> K+', value: 'K -> K+' },
                            { label: 'K', value: 'K' },
                            { label: 'K+', value: 'K+' },
                            { label: 'T', value: 'T' },
                            { label: 'M', value: 'M' },
                        ]}
                    ]}
                    defaultValue={ story.rating }
                />
            ) : <Text>{story.rating}</Text>,
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
                <>
                    {editing && (
                        <Select
                            mode="tags"
                            options={[
                                { label: 'M/M', value: 'M/M' },
                                { label: 'F/M', value: 'F/M' },
                                { label: 'F/F', value: 'F/F' },
                                { label: 'Gen', value: 'Gen' },
                                { label: 'Multi', value: 'Multi' },
                                { label: 'Other', value: 'Other' },
                            ]}
                            defaultValue={story.categories}
                            onChange={categories => handleChange('categories', categories)}
                        />
                    )}
                    {!editing && story.categories.length > 0 && (
                        <ul>
                            {story.categories.map(category => <li>{category}</li>)}
                        </ul>
                    )}
                    {!editing && story.categories.length === 0 && (
                        <Text>No categories were tagged</Text>
                    )}
                </>
            ),
            span: 1
        },
        {
            key: 'warnings',
            label: 'Warnings',
            children: (
                <>
                    {editing && (
                        <Select
                            mode="tags"
                            options={ story.warnings.map(warning => ({ label: warning, value: warning })) }
                            defaultValue={story.warnings}
                            onChange={warnings => handleChange('warnings', warnings)}
                        />
                    )}
                    {!editing && story.warnings.length > 0 && (
                        <ul>
                            {story.warnings.map(warning => <li>{warning}</li>)}
                        </ul>
                    )}
                    {!editing && story.warnings.length === 0 && (
                        <Text>No warnings were tagged</Text>
                    )}
                </>
            ),
            span: 1
        },
        {
            key: 'tags',
            label: 'Tags',
            children: (
                <>
                    {editing && (
                        <Select
                            mode="tags"
                            options={ story.tags.map(tag => ({ label: tag, value: tag })) }
                            defaultValue={story.tags}
                            onChange={tags => handleChange('tags', tags)}
                        />
                    )}
                    {!editing && story.tags.length > 0 && (
                        <ul>
                            {story.tags.map(tag => <li>{tag}</li>)}
                        </ul>
                    )}
                    {!editing && story.tags.length === 0 && (
                        <Text>No tags were tagged</Text>
                    )}
                </>
            ),
            span: 1
        }
    ];


    return (
        <Descriptions
            items={descriptionItems}
            title={story.title}
            bordered 
            extra={
                <Button type="link" href={story.url}>View Story</Button>
            }
            labelStyle={{ background: '#7775' }}
        />
    )

};


export { StoryDescriptions };
