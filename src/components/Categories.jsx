/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import axios from "axios"; 

export const Categories = ({activeCategory, setActiveCategory}) => {
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
