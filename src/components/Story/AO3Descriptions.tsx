import { DescriptionsProps, Select, Typography } from "antd";

import { IAO3Story } from "../../utils/types";

interface AO3DescriptionsProps {
    story: IAO3Story,
    editing: boolean
    handleChange: (field: string, value: string | string[]) => void
}


const AO3Descriptions = ({ story, editing, handleChange }: AO3DescriptionsProps) => {
    const { Text } = Typography;

    const descriptionItems: DescriptionsProps['items'] = [
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


    return descriptionItems;
};

export { AO3Descriptions };
