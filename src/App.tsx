import React from "react"; 
import { Routes, Route } from "react-router-dom"; 
import { Header } from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";

import "./scss/app.scss"; 

interface IAppContext {
   searchValue: string,
   setSearchValue: React.Dispatch<React.SetStateAction<string>>,
   currPage: number
}

const initialValue = {searchValue: '', setSearchValue: () => {}, currPage: 1};

export const AppContext = React.createContext<IAppContext>(initialValue);

function App() {
   const pages = [...new Array(3)].map((_, i) => i + 1);

   const [searchValue, setSearchValue] = React.useState("");

   const [currPage, setCurrPage] = React.useState(1);

   return (
      <div className="wrapper">
         <AppContext.Provider value={{ searchValue, setSearchValue, currPage }}>
            <Header />
            <div className="content">
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/pizza/:id" element={<FullPizza />} />
               </Routes>
            </div>
            <div className="pagination">
               <ul>
                  {pages.map((el) => (
                     <li className={currPage === el ? `current` : ``} onClick={() => setCurrPage(el)} key={el}>
                        {el}
                     </li>
                  ))}
               </ul>
            </div>
         </AppContext.Provider>
      </div>
   );
}

export default App;
