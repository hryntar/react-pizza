
import React, { FC } from "react";
import axios from "axios";

type Props = {
   activeCategory: number,
   setActiveCategory:  (id: number) => void;
}

export const Categories: FC<Props> = ({activeCategory, setActiveCategory}) => {
   const [categories, setCategories] = React.useState([]); 

   React.useEffect(() => {
      axios
         .get("api/categories")
         .then((res) => setCategories(res.data))
         .catch((err) => console.error(err));
   }, []); 

   return (
      <div className="categories">
         <ul>
            {categories.map((name, i) => (
               <li onClick={() => setActiveCategory(i)} className={activeCategory === i ? "active" : ""} key={i} >
                  {name}
               </li>
            ))} 
         </ul>
      </div>
   );
};
