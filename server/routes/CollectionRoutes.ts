import { Router } from "express";
import multer from "multer";

import {
    createCollection,
    deleteCollection,
    getAllCollections,
    getLatestCollection,
    uploadCollection
} from "../controllers/CollectionControllers";

const upload = multer({});

const collectionsRouter = Router();

collectionsRouter.get("/", getAllCollections);
collectionsRouter.get("/latest", getLatestCollection);
collectionsRouter.post("/", createCollection);
collectionsRouter.post("/upload", upload.single("collection"), uploadCollection);
collectionsRouter.delete("/:date", deleteCollection);


export { collectionsRouter };
