
import React, { FC, memo } from "react";
import axios from "axios"; 

type Props = {
   activeCategory: number,
   setActiveCategory:  (id: number) => void;
}

const categories = ["Усі", "М'ясні", "Вегетаріанські", "Гриль", "Гострі", "Закриті"];

export const Categories: FC<Props> = memo(({activeCategory, setActiveCategory}) => {
  
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
});
