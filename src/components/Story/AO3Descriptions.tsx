import { DescriptionsProps, Select, Tag, Typography } from "antd";

import { IAO3Story } from "../../utils/types";

const AO3Descriptions = (
    story: IAO3Story,
    editing: boolean,
    handleChange: (field: string, value: string | string[]) => void
) => {
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
                        <div className="categories">
                            {story.categories.map(category => <Tag key={category}>{category}</Tag>)}
                        </div>
                    )}
                    {!editing && story.categories.length === 0 && (
                        <Text>No categories were tagged</Text>
                    )}
                </>
            )
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
                        <div className="warnings">
                            {story.warnings.map(warning => <Tag key={warning}>{warning}</Tag>)}
                        </div>
                    )}
                    {!editing && story.warnings.length === 0 && (
                        <Text>No warnings were tagged</Text>
                    )}
                </>
            )
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
                        <div className="tags">
                            {story.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                        </div>
                    )}
                    {!editing && story.tags.length === 0 && (
                        <Text>No tags were added</Text>
                    )}
                </>
            ),
            span: 2
        }
    ];


    return descriptionItems;
};

export { AO3Descriptions };
