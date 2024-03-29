import { useSelector } from "react-redux"; 
import { AppContext } from "../App.tsx";
import { Categories } from "../components/Categories.jsx";
import ContentLoader from "react-content-loader";
import { PizzaBlock } from "../components/PizzaBlock.jsx";
import React, { FC, useCallback } from "react";
import { Sort } from "../components/Sort.jsx";
import { fetchPizzas } from "../redux/slices/pizzasSlice.js";
import { setActiveCategory } from "../redux/slices/filterSlice.js";
import { RootState, useAppDispatch } from "../redux/store.ts"; 

const Home: FC = () => {
   const activeCategory = useSelector((state: RootState) => state.filterSlice.activeCategory);
   const { pizzas, status } = useSelector((state: RootState) => state.pizzasSlice);
   const tagIdx = useSelector((state: RootState) => state.filterSlice.tagIdx);
   const dispatch = useAppDispatch();

   const { searchValue, currPage } = React.useContext(AppContext);

   React.useEffect(() => { 
      dispatch( 
         fetchPizzas({
            activeCategory,
            tagIdx,
            currPage,
         })
      );
   }, [activeCategory, tagIdx, currPage, dispatch]);

   const onChangeCategory = useCallback((id: number) => {
      dispatch(setActiveCategory(id));
   }, [])

   

   return (
      <div className="container">
         <div className="content__top">
            <Categories setActiveCategory={onChangeCategory} activeCategory={activeCategory} />
            <Sort />
         </div>
         <h2 className="content__title">Усі піци</h2>
         <div className="content__items">
            {status === "loading"
               ? [...new Array(8)].map((_i, idx) => (
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

export default Home;