import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import FurnitureModel from "../3-models/furniture-model";
import FurnitureTypeModel from "../3-models/furniture-type-model";
import { error } from "console";
import { ResourceNotFoundError } from "../3-models/client-errors";

async function getAllFurniture(): Promise<FurnitureModel[]> {
    const sql = `SELECT furnituretype.typeName as type,
     furniture.furnitureId,
     furniture.size,  
     furniture.color,
     furniture.price
     from furniture
     inner join   
     furnituretype on furnituretype.typeId = furniture.typeId
     `;

     const furniture = await dal.execute(sql);
     return furniture;

}

async function addFurniture(furniture: FurnitureModel): Promise<FurnitureModel>{
    furniture.validate();
    const sql = "INSERT INTO furniture VALUES(DEFAULT,?,?,?,?)";
    const info: OkPacket = await dal.execute(sql,[furniture.typeId, furniture.size, furniture.color, furniture.price]);
    furniture.furnitureId = info.insertId;
    return furniture;
}

async function getAllFurnitureTypes(): Promise<FurnitureTypeModel[]>{
    const sql = "SELECT * FROM furnituretype ";
    const furnitureTypes = await dal.execute(sql);
    return furnitureTypes;
}

async function deleteFurniture(furnitureId: number): Promise<void>{
    const sql = `delete FROM furniture WHERE furnitureId = ? `;
    const info: OkPacket = await dal.execute(sql,[furnitureId]);
    if(info.affectedRows ===0) throw new ResourceNotFoundError(furnitureId);
}

export default {
    getAllFurniture,
    addFurniture,
    getAllFurnitureTypes,
    deleteFurniture
};

