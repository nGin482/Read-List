import { DataTypes, Model } from "sequelize";

import { database } from "..";
import { FandomArchive } from "../../../utils/types";


class Fandom extends Model<FandomArchive, FandomArchive> {
    declare name: string
    declare ffn_url: string
    declare ao3_url: string
    declare search: string
    declare ignore_stories: string[]
}

Fandom.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        ffn_url: {
            type: DataTypes.TEXT
        },
        ao3_url: {
            type: DataTypes.TEXT
        },
        search: {
            type: DataTypes.TEXT
        },
        ignore_stories: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        }
    }, {
        sequelize: database,
        modelName: 'Fandom'
    }
);

export { Fandom };
