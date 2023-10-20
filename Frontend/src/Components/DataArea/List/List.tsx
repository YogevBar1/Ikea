import { useEffect, useState } from "react";
import "./List.css";
import FurnitureModel from "../../../Models/FurnitureModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import FurnitureCard from "../FurnitureCard/FurnitureCard";

function List(): JSX.Element {
    const [furniture, setFurniture] = useState<FurnitureModel[]>([]);
    useEffect(() => {
        dataService.getAllFurniture()
            .then(dbFurniture => setFurniture(dbFurniture))
            .catch(err => notifyService.error(err));
    }, []);

    async function deleteMe(furnitureId: number): Promise<void> {
        try {
            const confrim = window.confirm("are you sure you want to delete this furniture?");
            if (!confrim) return;
            await dataService.deleteFurniture(furnitureId);
            setFurniture(furniture.filter(furniture => furniture.furnitureId !== furnitureId));
            notifyService.success("furniture has been deleted");
        }

        catch (err: any) {
            notifyService.error(err);
        }

    }

    return (
        <div className="List">
            <h2>Furniture List</h2>
            {furniture.map(furniture => <FurnitureCard key={furniture.furnitureId} furniture={furniture} deleteMe={deleteMe} />)}
        </div>
    );
}

export default List;
