import axios from "axios";
import FurnitureModel from "../Models/FurnitureModel";
import appConfig from "../Utils/AppConfig";
import FurnitureTypeModel from "../Models/FurnitureTypeModel";
import notifyService from "./NotifyService";

class DataService {
    public async getAllFurniture(): Promise <FurnitureModel[]> {
        const response = await axios.get<FurnitureModel[]>(appConfig.furnitureUrl)
        const furniture = response.data;
        return furniture;
    }

    public async addFurniture(furniture: FurnitureModel): Promise<void>{
        await axios.post(appConfig.furnitureUrl, furniture);
    }

    public async getAllFurnitureTypes(): Promise<FurnitureTypeModel[]>{
        const response = await axios.get(appConfig.furnitureTypesUrl);
        const furnitureTypes = response.data;
        return furnitureTypes;
    }
    catch(err: any){
        notifyService.error(err);
    }

    public async deleteFurniture(furnitureId: number): Promise<void>{
        await axios.delete(appConfig.furnitureUrl + furnitureId);
    }
}

const dataService = new DataService();

export default dataService;
