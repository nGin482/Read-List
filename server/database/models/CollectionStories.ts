import { DataTypes, Model } from "sequelize";

import { database } from "..";
import { Collection } from "./CollectionModel";
import { Story } from "./Story";

interface ICollectionStories {
    collection_id: number
    story_id: number
}

class CollectionStories extends Model<ICollectionStories, ICollectionStories> {
    declare collection_id: number
    declare story_id: number
}

CollectionStories.init(
    {
        collection_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Collection,
                key: 'id'
            }
        },
        story_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Story,
                key: 'storyId'
            }
        }
    }, {
        sequelize: database,
        modelName: 'CollectionStory'
    }
);

export { CollectionStories };
