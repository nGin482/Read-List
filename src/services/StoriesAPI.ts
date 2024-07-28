

import { APIClient } from "./APIClient";
import { IStory, ReadingStatus } from '../../utils/types';

export class StoriesAPI extends APIClient {

    private static apiClient: APIClient = new APIClient();
    private static baseEndpoint = '/stories';

    static async getStoryById(id: string) {
        const story = await this.apiClient.get<IStory>(`${this.baseEndpoint}/${id}`);

        return story;
    };

    static async getReadingList() {
        const readingList = await this.apiClient.get<IStory[]>(this.baseEndpoint + '/reading-list');
        return readingList;
    };

    static async getCompletedList() {
        const completedList = await this.apiClient.get<IStory[]>(this.baseEndpoint + '/complete-list');
        return completedList;
    };

    static async updateStoryDetails(story: IStory) {
        const updatedStory = await this.apiClient.put<IStory, IStory>(
            `${this.baseEndpoint}/${story.storyId}`,
            story
        );

        return updatedStory;
    };

    static async updateReadingStatus(storyId: number, status: ReadingStatus) {
        const updatedStory = await this.apiClient.patch<{ status: ReadingStatus }, IStory>(
            this.baseEndpoint + `/${storyId}/reading-status`,
            { status }
        );
        return updatedStory;
    };

    static async deleteStory(storyId: number) {
        await this.apiClient.delete(this.baseEndpoint + `/${storyId}`);
    };
}