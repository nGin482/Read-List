import { DataTypes, Model, QueryTypes } from "sequelize";

import { database } from "..";
import { ICollection, IStory } from "../../../utils/types";


class Collection extends Model<ICollection, ICollection> {
    id: string
    declare date: Date

    async getStoriesForDate() {
        const SQL = `SELECT "S".*
            FROM "public"."Stories" as "S"
            INNER JOIN "public"."CollectionStories" as "CS" on "CS"."storyId" = "S"."storyId"
            INNER JOIN "public"."Collections" as "C" on "CS"."collectionId" = "C"."id"
            WHERE "C"."date" = ?;
        `;
        const queryResults = await database.query<IStory>(
            SQL,
            { replacements: [this.date], type: QueryTypes.SELECT }
        );

        return queryResults;
    };
}

Collection.init(
    {
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize: database,
        modelName: 'Collection'
    }
);

export { Collection };
