
import { getAllCollections } from "../../server/controllers/CollectionControllers";
import { collections } from "../test-data/collections";

const mockRequest = {
    body: null
};

const mockResponse = {
    body: null,
    headers: {
        'Content-Type': 'application/json'
    }
};



describe('test controllers', () => {
    it('should return a list of collections', async () => {
        
        mockResponse.body = collections;
        const response = await getAllCollections(mockRequest, mockResponse);
        
        expect(response.status).toEqual(200);
        expect(response.getHeaders()['Content-Type']).toContain('application/json');
        expect(response.json()).toEqual(new Date(2021, 5, 6));
        expect(response.body.stories).toHaveLength(1);
    });


    afterAll(done => {
        done();
    });
});
