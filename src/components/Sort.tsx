 import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTagIdx, tagIdxType } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store"; 

export const Sort = () => { 
   const [popupOpen, setPopupOpen] = React.useState(false);
   const tags = [{name: "популярністю", sortProp: "rating"},{name: "ціною", sortProp: "price"}, {name: "алфавітом", sortProp: "title"}]; 

   const tagIdx = useSelector((state: RootState) => state.filterSlice.tagIdx);
   const dispatch = useDispatch();

   const sortRef = React.useRef<HTMLDivElement>(null);
   React.useEffect(() => {

      const handleClickOutside = (event: Event) => {
         if (!(event.composedPath().includes(sortRef.current!))) {
            setPopupOpen(false);
         } 
      }

      document.body.addEventListener("click", handleClickOutside)

      return () => {
         document.body.removeEventListener("click", handleClickOutside)
      }
   }, [])

   
   function handleTagClick(idx: tagIdxType) { 
      dispatch(setTagIdx(idx));
      setPopupOpen(false);
   } 

   return (
      <div ref={sortRef} className="sort">
         <div onClick={() => setPopupOpen(!popupOpen)} className="sort__label">
            <svg style={{ transform: popupOpen ? 'rotate(0deg)' : 'rotate(180deg)' }} width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="#2C2C2C"
               />
            </svg>
            <b>Сортувати за:</b>
            <span>{tagIdx.name}</span>
         </div>
         <div className={`sort__popup ${popupOpen ? `_open` : ``}`} >
            <ul>
              {tags.map((tag, idx) => <li onClick={() => handleTagClick(tag)} className={tagIdx.sortProp === tag.sortProp ? 'active' : ''} key={idx}>{tag.name}</li>)}
            </ul>
         </div>
      </div>
   );
};
