import { Router } from "express";

import {
    createFandom,
    deleteFandom,
    getAllFandoms,
    getFandom,
    ignoreStory,
    updateFandom
} from "../controllers/FandomControllers";

const fandomRouter = Router();

fandomRouter.get('/', getAllFandoms);
fandomRouter.get(':/fandom', getFandom);
fandomRouter.post('/', createFandom);
fandomRouter.put('/:fandom', updateFandom);
fandomRouter.patch('/:fandom', ignoreStory);
fandomRouter.delete('/:fandom', deleteFandom);

export { fandomRouter };
