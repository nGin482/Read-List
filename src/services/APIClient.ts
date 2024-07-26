import axios from "axios";

interface IAPIClient {
    get<PayloadType>(endpoint: string, queryParams: { key: string, value: string }): Promise<PayloadType>
    put<RequestType, ResponseType>(endpoint: string, body: RequestType): Promise<ResponseType>
    delete(endpoint: string): Promise<void>
}

class APIClient implements IAPIClient {

    private static BASE_URL = 'http://localhost:3001/api';

    async get<PayloadType>(endpoint: string) {
        console.log(`${APIClient.BASE_URL}${endpoint}`)
        const response = await axios.get<PayloadType>(APIClient.BASE_URL + endpoint);

        return response.data;
    }

    async put<RequestType, ResponseType>(endpoint: string, body: RequestType): Promise<ResponseType> {
        const response = await axios.put<ResponseType>(APIClient.BASE_URL + endpoint, body);
        
        return response.data;
    };

    async patch<RequestType, ResponseType>(endpoint: string, body: RequestType): Promise<ResponseType> {
        const response = await axios.patch<ResponseType>(APIClient.BASE_URL + endpoint, body);
        
        return response.data;
    };
    
    async delete(endpoint: string) {
        await axios.delete(APIClient.BASE_URL + endpoint);
    }
};

export { APIClient };
