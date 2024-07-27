import { Router } from "express";
import { createCollection, deleteCollection, getAllCollections, getLatestCollection } from "../controllers/CollectionControllers";

const collectionsRouter = Router();

collectionsRouter.get('/', getAllCollections);
collectionsRouter.get('/latest', getLatestCollection);
collectionsRouter.post('/', createCollection);
collectionsRouter.delete('/:date', deleteCollection);


export { collectionsRouter };
