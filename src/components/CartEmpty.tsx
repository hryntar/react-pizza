
import { Link } from "react-router-dom";
export default function CartEmpty() {
   return (
      <div className="cart cart--empty">
         <h2>Кошик порожній 😕</h2>
         <p>
            Немає доданих в кошик піц.
            <br />
            Ви можете додати піцу в кошик на головній сторінці.
         </p>
         <img src="/img/empty-cart.png" alt="Empty cart" />
         <Link to="/" className="button button--black">
            <span>Повернутися назад</span>
         </Link>
      </div>
   );
}
