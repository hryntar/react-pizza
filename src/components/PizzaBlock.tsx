/* eslint-disable react/prop-types */
import React, {FC} from "react";

import { useSelector } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../redux/store";

const typeNames = ["тонке", "традиційне"]; 

type PizzaBlockProps = {
   id: number,
   title: string,
   price: number,
   imageUrl: string,
   types: number[],
   sizes: number[],
   count?: number
}

export const PizzaBlock: FC<PizzaBlockProps> = ({ id, title, price, imageUrl, types, sizes, count = 1}) => {
   const dispatch = useAppDispatch();
   const cartItem = useSelector((state: RootState) => state.cartSlice.items.find(obj => obj.id === id) ); 

   const [currentSize, setCurrentSize] = React.useState(0);
   const [currentType, setCurrentType] = React.useState(0); 

   const onClickAdd = () => {
      const item = {
         id,
         title,
         price,
         imageUrl,
         type: typeNames[currentType],
         size: sizes[currentSize],
         count,
         types,
         sizes
      };

      dispatch(addItem(item));
   }; 

   return (
      <div className="pizza-block">
         <Link to={`/pizza/${id}`}><img className="pizza-block__image" src={imageUrl} alt="Pizza" /></Link>
         <h4 className="pizza-block__title">{title}</h4>
         <div className="pizza-block__selector">
            <ul>
               {types?.map((val) => (
                  <li
                     key={val}
                     onClick={() => setCurrentType(val)}
                     className={types.length >= 2 ? (currentType === val ? "active" : "") : "active"}
                  >
                     {typeNames[val]}
                  </li>
               ))}
            </ul>
            <ul>
               {sizes?.map((val, idx) => (
                  <li onClick={() => setCurrentSize(idx)} className={currentSize === idx ? "active" : ""} key={idx}>
                     {val}
                  </li>
               ))}
            </ul>
         </div>
         <div className="pizza-block__bottom">
            <div className="pizza-block__price">від {price} ₴</div>
            <div onClick={onClickAdd} className="button button--outline button--add">
               <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                     fill="white"
                  />
               </svg>
               <span>Додати</span>
               {cartItem && <i>{cartItem.count}</i>}
            </div>
         </div>
      </div>
   );
};
