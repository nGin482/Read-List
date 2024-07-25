import { Router } from "express";
import { createCollection, deleteCollection, getAllCollections } from "../controllers/CollectionControllers";

const collectionsRouter = Router();

collectionsRouter.get('/', getAllCollections);
collectionsRouter.post('/', createCollection);
collectionsRouter.delete('/:date', deleteCollection);


export { collectionsRouter };
