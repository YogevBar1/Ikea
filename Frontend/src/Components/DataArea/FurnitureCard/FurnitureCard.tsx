import FurnitureModel from "../../../Models/FurnitureModel";
import "./FurnitureCard.css";

interface FurnitureCard {
    furniture: FurnitureModel
    deleteMe: (furnitureId: number) => void
}

function FurnitureCard(props : FurnitureCard): JSX.Element {

    async function deleteMe() {
        props.deleteMe(props.furniture.furnitureId);
        
    }

    return (
        <div className="FurnitureCard">

			<span>Name: {props.furniture.type}</span><br /><br />
			<span>Dimensions: {props.furniture.size}</span><br /><br />
			<span>Color: {props.furniture.color}</span><br /><br />
			<span>Price: {props.furniture.price}</span>
            <hr />
            <button onClick={deleteMe}>delete❌</button>

        </div>
    );
}

export default FurnitureCard;
