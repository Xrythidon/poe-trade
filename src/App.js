import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { grabAPI } from "./redux/search/search.actions";
import { fetchItem } from "./redux/item/item.actions";
import "./App.scss";

import Item from "./components/item/item.component";
import Item2 from "./components/item/item2.component"

function App() {
  const search = useSelector((state) => state.search); // redux name in rootReducer
  const item = useSelector((state) => state.item); // redux name in rootReducer
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(search.currentSearch);
  }, [search]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchItem(idRef.current.value));
  };

  return (
    <div className="App">
      <h1>PoE Info</h1>
      <p>{search.fetching.toString()}</p>
      <button onClick={() => dispatch(grabAPI())}>Test Me</button>

      <form onSubmit={handleSubmit}>
        <input ref={idRef} type="text" key="key1" placeholder="Test ID Here" />

        <input type="submit" value="Submit" key="key2" />
      </form>

        {
          item.loaded &&
          <Item item={item.items} />
        }

       
          <Item2 itemId={"650528de7b7c254022a03562fbc057b06c12e117200083978a6706746d8fab77"} />





    </div>
  );
}

export default App;
