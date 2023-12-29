import React from "react";

import { AppContext } from "../../App";

import styles from "./Search.module.scss";

export default function Search() {

   const {searchValue,setSearchValue} = React.useContext(AppContext);

   return <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className={styles.root} type="text" placeholder="Пошук піци..." />;
}
