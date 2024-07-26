

import { APIClient } from "./APIClient";
import { FandomArchive } from "../../utils/types";

export class FandomsAPI {
    private static apiClient = new APIClient();
    private static baseEndpoint = '/fandoms';

    static async getAllFandoms() {
        const fandoms = await this.apiClient.get<FandomArchive[]>(this.baseEndpoint);
        return fandoms;
    };

    static async getFandom(name: string) {
        const fandom = await this.apiClient.get<FandomArchive>(this.baseEndpoint + `/${name}`);
        return fandom;
    };

    static async createFandom(fandom: FandomArchive) {
        const newFandom = await this.apiClient.post<FandomArchive, FandomArchive>(this.baseEndpoint, fandom);
        return newFandom;
    };

    /**
     * Pass in the original name of the fandom in case it's has been updated
     */
    static async updateFandom(name: string, fandom: FandomArchive) {
        const updatedFandom = await this.apiClient.put<FandomArchive, FandomArchive>(
            this.baseEndpoint + `/${name}`,
            fandom
        );
        return updatedFandom;
    };

    static async ignoreStory(fandom: string, storyTitle: string) {
        const updatedFandom = await this.apiClient.patch<{ title: string }, FandomArchive>(
            this.baseEndpoint + `/${fandom}`,
            { title: storyTitle }
        );
        return updatedFandom;
    };

    static async deleteFandom(name: string) {
        await this.apiClient.delete(this.baseEndpoint + `/${name}`);
    };
};