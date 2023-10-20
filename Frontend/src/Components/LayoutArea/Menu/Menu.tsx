import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/furniture">Furniture List</NavLink>
            <span> | </span>
			<NavLink to="/add-furniture">Add Furniture</NavLink>
      
        </div>
    );
}

export default Menu;
