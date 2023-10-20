import { useNavigate } from "react-router-dom";
import FurnitureModel from "../../../Models/FurnitureModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./Insert.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import FurnitureTypeModel from "../../../Models/FurnitureTypeModel";

function Insert(): JSX.Element {

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<FurnitureModel>();

    const [furniture, setFurniture] = useState<FurnitureModel[]>([]);
    useEffect(()=>{

        dataService.getAllFurniture()
        .then(backendFurniture =>setFurniture(backendFurniture) )
        .catch(err=> notifyService.error(err));

    },[]);
    
    const[types, setTypes] = useState<FurnitureTypeModel[]>([]);
    
    useEffect(()=>{
        dataService.getAllFurnitureTypes()
        .then(backendFurnitureTypes=>setTypes(backendFurnitureTypes))
        .catch(err=>notifyService.error(err));
    },[]);

    async function send (furniture: FurnitureModel): Promise<void>{
        try{
            await dataService.addFurniture(furniture);
            notifyService.success("furniture has been added successfully");
            navigate("/furniture");
        }
        catch(err: any){
            notifyService.error(err);
        }
    }
    
    return (
        <div className="Insert">
			<h2>Add Furniture:</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Name:</label>
                <select required defaultValue="" {...register("typeId")}>

                    <option disabled value="">Pick</option>
                    {types.map(furnitureType => <option key={furnitureType.typeId} value={furnitureType.typeId}>{furnitureType.typeName}</option>)}

                </select>
                <br /><br />
                <label>Dimensions</label>
                <input type="text" required {...register("size")}></input>

                <br /><br />
                <label>Color</label>
                <input type="text" required {...register("color")}></input>

                <br /><br />
                <label>Price:</label>
                <input type="number" min="0" max="99999.99" required {...register("price")}></input>
                
                <br /><br />
                <button>Add</button>

            </form>
        </div>
    );
}

export default Insert;
