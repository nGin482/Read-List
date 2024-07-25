import { Request, Response } from "express";

import { Fandom } from "../database/models";
import { FandomArchive } from "../../utils/types";


type FandomResponse = Fandom | Fandom[] | { message: string }

export const getAllFandoms = async (request: Request, response: Response<FandomResponse>) => {

    const fandoms = await Fandom.findAll();

    return response.status(200).json(fandoms);
};

export const getFandom = async (request: Request<{ fandom: string }>, response: Response<FandomResponse>) => {
    const { fandom } = request.params;

    const fandomRecord = await Fandom.findOne({ where: { name: fandom } });

    if (fandomRecord) {
        return response.status(200).json(fandomRecord);
    }
    else {
        return response.status(404).json({ message: `The fandom '${fandom}' could not be found` });
    }
};

export const createFandom = async (request: Request<{}, {}, FandomArchive>, response: Response<FandomResponse>) => {
    const newFandomDetails = request.body;

    const fandomCheck = await Fandom.findOne({ where: { name: newFandomDetails.name } });

    if (fandomCheck) {
        return response.status(409).json({
            message: `The archive is already searching for stories in ${newFandomDetails.name}`
        });
    }

    try {
        const newFandom = await Fandom.create(newFandomDetails);
        return response.status(201).json(newFandom);
    }
    catch(error) {
        return response.status(500).json({ message: `There was a problem creating ${newFandomDetails.name}` });
    }
};

export const updateFandom = async (request: Request<{ fandom: string }, {}, FandomArchive>, response: Response<FandomResponse>) => {
    const { fandom } = request.params;
    const newDetails = request.body;
    
    const fandomCheck = await Fandom.findOne({ where: { name: fandom } });

    if (!fandomCheck) {
        return response.status(404).json({ message: `The fandom '${fandom}' does not exist` });
    }

    try {
        const [update] = await Fandom.update(newDetails, { where: { name: fandom } });
        if (update === 1) {
            const updatedFandom = await Fandom.findOne({ where: { name: fandom } });
            return response.status(200).json(updatedFandom);
        }
        else if (update === 0) {
            return response.status(500).json({ message: `'${fandom}' was not updated` });
        }
        else {
            // TODO: Work out how to handle if more than one record is updated
        }
    }
    catch(error) {
        console.error(error)
        return response.status(500).json({ message: `An error occurred updating '${fandom}'` });
    }
};

export const ignoreStory = async (request: Request<{ fandom: string }, {}, { storyId: string }>, response: Response<FandomResponse>) => {
    const { fandom } = request.params;

    const fandomCheck = await Fandom.findOne({ where: { name: fandom } });
    if (!fandomCheck) {
        return response.status(404).json({message: `The fandom '${fandom}' could not be found` });
    }
    const updatedFandom = await fandomCheck.update({ ignore_stories: [...fandomCheck.ignore_stories, request.body.storyId] });

    return response.status(200).json(updatedFandom);
};

export const deleteFandom = async (request: Request<{ fandom: string }>, response: Response<FandomResponse>) => {
    const { fandom } = request.params;

    const fandomCheck = await Fandom.findOne({ where: { name: fandom } });

    if (!fandomCheck) {
        return response.status(404).json({ message: `The fandom '${fandom}' could not be found` });
    }
    await fandomCheck.destroy();
};
