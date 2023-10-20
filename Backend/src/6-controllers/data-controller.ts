import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import FurnitureModel from "../3-models/furniture-model";
import StatusCode from "../3-models/status-code";
import FurnitureTypeModel from "../3-models/furniture-type-model";

const router = express.Router();

// GET http://localhost:4000/api/furniture
router.get("/furniture", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const furniture = await dataService.getAllFurniture();
        response.json(furniture);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4000/api/furniture
router.post("/furniture", async (request: Request, response: Response, next: NextFunction) => {
    try {       
        const furniture = new FurnitureModel(request.body);
        const addedFurniture = await dataService.addFurniture(furniture);
        response.status(StatusCode.Created).json(addedFurniture);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/types
router.get("/types", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const furnitureTypes = await dataService.getAllFurnitureTypes();
        response.json(furnitureTypes);
    }
    catch (err: any) {
        next(err);
    }
});

// Delete http://localhost:4000/api/furniture/:id
router.delete("/furniture/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const furnitureId =+ request.params.id;
        const furnitures = await dataService.deleteFurniture(furnitureId);
        response.json(furnitures);
    
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
