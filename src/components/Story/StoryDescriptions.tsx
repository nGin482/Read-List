import { Button, DatePicker, Descriptions, DescriptionsProps, Input, Select, Tag, Typography } from "antd";
import dayjs from "dayjs";

import { IStory } from "../../utils/types";
import { AO3Descriptions } from "./AO3Descriptions";
import { FFNDescriptions } from "./FFNDescriptions";


const StoryDescriptions = ({ story, editing }: { story: IStory, editing: boolean }) => {
    const { Text } = Typography;

    const handleChange = (field: string, value: string | string[]) => {
        story[field] = value;
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
            span: 2
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
            span: 2
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
            ) : <Text>{story.words}</Text>
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
                        <div className="fandoms">
                            {story.fandoms.map(fandom => (
                                <Tag key={fandom}>{fandom}</Tag>
                            ))}
                        </div>
                    )}
                    {!editing && story.fandoms.length === 0 && (
                        <Text>No fandoms were tagged</Text>
                    )}
                </>
            ),
            span: 2
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
                        <div className="characters">
                            {story.characters.map(character => <Tag key={character}>{character}</Tag>)}
                        </div>
                    )}
                    {!editing && story.characters.length === 0 && (
                        <Text>No characters were tagged</Text>
                    )}
                </>
            ),
            span: 1
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
                        <div className="relationships">
                            {story.relationships.map(ship => <Tag key={ship}>{ship}</Tag>)}
                        </div>
                    )}
                    {!editing && story.relationships.length === 0 && (
                        <Text>No relationships were tagged</Text>
                    )}
                </>
            ),
            span: 1
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
            ) : (
                <Text>
                    {story.publishedDate ? (
                        dayjs(story.publishedDate).format('DD MMMM YYYY')
                    ) : (
                        <Tag color="volcano-inverse">No date provided</Tag>
                    )}
                </Text>
            )
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
            ) : <Text>{dayjs(story.updatedDate).format('DD MMMM YYYY')}</Text>
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
            ) : <Text>{story.status}</Text>
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
            ) : <Text>{story.rating}</Text>
        }
    ];


    return (
        <Descriptions
            items={
                story.archive === 'Archive of our Own'
                ? descriptionItems.concat(AO3Descriptions(story, editing, handleChange))
                : descriptionItems.concat(FFNDescriptions(story, editing, handleChange))
            }
            title={story.title}
            bordered 
            extra={
                <Button type="link" href={story.url}>View Story</Button>
            }
            labelStyle={{ background: '#7775' }}
            column={2}
        />
    )

};


export { StoryDescriptions };
