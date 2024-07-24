import { DataTypes, Model } from "sequelize";

import { database } from "..";
import { Collection } from "./CollectionModel";
import { Story } from "./Story";

interface ICollectionStories {
    collectionId: number
    storyId: number
}

class CollectionStories extends Model<ICollectionStories, ICollectionStories> {
    declare collectionId: number
    declare storyId: number
}

CollectionStories.init(
    {
        collectionId: {
            type: DataTypes.INTEGER,
            references: {
                model: Collection,
                key: 'id'
            }
        },
        storyId: {
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
