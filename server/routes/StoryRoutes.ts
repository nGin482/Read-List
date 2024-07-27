import { Router } from "express";
import { deleteStory, getCompleteList, getReadingList, getStory, updateReadingStatus, updateStory } from "../controllers/StoryControllers";


const storyRouter = Router();

storyRouter.get('/reading-list', getReadingList);
storyRouter.get('/complete-list', getCompleteList);
storyRouter.get('/:storyId', getStory);
storyRouter.put('/:storyId', updateStory);
storyRouter.patch('/:storyId/reading-status', updateReadingStatus);
storyRouter.delete('/:storyId', deleteStory);

export { storyRouter };
