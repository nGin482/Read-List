
import { APIClient } from "./APIClient";
import { ICollection } from "../../utils/types";

class CollectionsAPI extends APIClient {
    private static apiClient = new APIClient();
    private static baseEndpoint = '/collections';

    static async getAllCollections() {
        const collections = this.apiClient.get<ICollection[]>(this.baseEndpoint);
        return collections;
    };

    static async getCollectionForDate(date: string) {
        const collection = this.apiClient.get<ICollection>(this.baseEndpoint, { key: 'date', value: date });
        return collection;
    };

    static async getLatestCollection() {
        const latestCollection = await this.apiClient.get<ICollection>(this.baseEndpoint + '/latest');
        return latestCollection;
    };

    static async deleteCollection(date: string) {
        await this.apiClient.delete(this.baseEndpoint + `/${date}`)
    };
};

export { CollectionsAPI };
