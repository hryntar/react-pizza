/* eslint-disable react/prop-types */
import React from "react";
import ContentLoader from "react-content-loader";
import axios from "axios";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";

import { AppContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../redux/slices/filterSlice";

export const FilterContext = React.createContext();

export default function Home() { 
   const activeCategory = useSelector(state => state.filterSlice.activeCategory); 
   const tagIdx = useSelector(state => state.filterSlice.tagIdx) 
   const dispatch = useDispatch(); 

   const [pizzas, setPizzas] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true); 

   const { searchValue, currPage } = React.useContext(AppContext);
   
   React.useEffect( () => {
      setIsLoading(true);
      // "api/pizzas"https://654ce0fc77200d6ba8599ac9.mockapi.io/pizzas?
      (async () => {
         await axios
         .get(
            `https://654ce0fc77200d6ba8599ac9.mockapi.io/pizzas?page=${currPage}&limit=8&sortBy=${tagIdx.sortProp}&order=desc${
               activeCategory ? `&category=${activeCategory}` : ``
            }`
         )
         .then((res) => {
            setPizzas(res.data);
            setIsLoading(false);
         })
         .catch((err) => console.error(err));
      })()
      
   }, [activeCategory, tagIdx, currPage]);

   return (
      <div className="container"> 
            <div className="content__top">
               <Categories setActiveCategory={(id) => dispatch(setActiveCategory(id))} activeCategory={activeCategory} />
               <Sort />
            </div> 
         <h2 className="content__title">Усі піци</h2>
         <div className="content__items">
            {isLoading
               ? [...new Array(8)].map((i, idx) => (
                    <ContentLoader
                       key={idx}
                       speed={2}
                       width={280}
                       height={470}
                       viewBox="0 0 280 470"
                       backgroundColor="#f3f3f3"
                       foregroundColor="#ecebeb"
                    >
                       <circle cx="139" cy="140" r="125" />
                       <rect x="64" y="280" rx="5" ry="5" width="150" height="20" />
                       <rect x="0" y="320" rx="20" ry="20" width="280" height="85" />
                       <rect x="3" y="432" rx="6" ry="6" width="89" height="25" />
                       <rect x="151" y="425" rx="15" ry="15" width="125" height="40" />
                    </ContentLoader>
                 ))
               : pizzas
                    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
         </div>
      </div>
   );
}
