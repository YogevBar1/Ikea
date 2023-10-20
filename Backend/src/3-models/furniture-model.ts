import Joi from "joi";
import { ValidationError } from "./client-errors";

class FurnitureModel{
    public furnitureId: number;
    public typeId: number;
    public size: string;
    public color: string;
    public price: number;
    public type: string;


    public constructor(furniture: FurnitureModel ){
        this.furnitureId = furniture.furnitureId;
        this.typeId = furniture.typeId;
        this.size = furniture.size;
        this.color = furniture.color;
        this.price = furniture.price;

    }

    private static validationSchema = Joi.object({
        furnitureId: Joi.number().optional().positive().integer(),
        typeId: Joi.number().optional().positive().integer(),
        size: Joi.string().required().min(3).max(20),
        color: Joi.string().required().min(3).max(20),
        price: Joi.number().required().min(1).max(10000),
        
    });

    public validate(): void{
        const result = FurnitureModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default FurnitureModel;