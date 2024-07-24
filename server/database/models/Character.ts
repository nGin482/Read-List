import { DataTypes, Model } from "sequelize";

import { database } from "..";
import { Fandom } from "./Fandom";
import { ICharacter } from "../../../utils/types";


class Character extends Model<ICharacter, ICharacter> {
    declare name: string
    declare fandom_id: number
}

Character.init(
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
        fandom_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Fandom,
                key: 'id'
            }
        }
    }, {
        sequelize: database,
        modelName: 'Character'
    }
);

export { Character };
