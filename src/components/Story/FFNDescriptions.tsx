import { DescriptionsProps, Select, Typography } from "antd";

import { IFFNStory } from "../../utils/types";

const FFNDescriptions = (
    story: IFFNStory,
    editing: boolean,
    handleChange: (field: string, value: string | string[]) => void
) => {
    const { Text } = Typography;

    const descriptionItems: DescriptionsProps['items'] = [
        {
            key: 'genres',
            label: 'Genres',
            children: (
                <>
                    {editing && (
                        <Select
                            mode="tags"
                            options={ story.genres.map(tag => ({ label: tag, value: tag })) }
                            defaultValue={story.genres}
                            onChange={tags => handleChange('tags', tags)}
                        />
                    )}
                    {!editing && story.genres.length > 0 && (
                        <ul>
                            {story.genres.map(tag => <li>{tag}</li>)}
                        </ul>
                    )}
                    {!editing && story.genres.length === 0 && (
                        <Text>No tags were tagged</Text>
                    )}
                </>
            )
        }
    ];


    return descriptionItems;
};

export { FFNDescriptions };
