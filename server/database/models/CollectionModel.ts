import { DataTypes, Model } from "sequelize";

import { database } from "..";
import { ICollection } from "../../../utils/types";


class Collection extends Model<ICollection, ICollection> {
    declare date: Date
}

Collection.init(
    {
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        stories: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        }
    }, {
        sequelize: database,
        modelName: 'Collection'
    }
);

export { Collection };
