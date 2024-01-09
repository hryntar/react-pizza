import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"; 
import { RootState } from "../redux/store";

export default function FullPizza() {
   const {id} = useParams();
   const {pizzas} = useSelector((state: RootState) => state.pizzasSlice); 
   const pizza = pizzas.find(obj => obj.id === Number(id));
   return (
      <div className="container">
         <h2>{pizza?.title}</h2>
         <p>{pizza?.price}</p> 
         <Link to="/" className="button button--black">
            <span>Повернутися назад</span>
         </Link>
      </div>
   );
}
