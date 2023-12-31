import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"; 

export default function FullPizza() {
   const {id} = useParams();
   const {pizzas} = useSelector(state => state.pizzasSlice);
   const {title, price} = pizzas.find(obj => obj.id == id);
   return (
      <div className="container">
         <h2>{title}</h2>
         <p>{price}</p> 
         <Link to="/" className="button button--black">
            <span>Повернутися назад</span>
         </Link>
      </div>
   );
}
