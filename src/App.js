import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { grabAPI } from "./redux/search/search.actions";
import { fetchItem } from "./redux/item/item.actions";
import "./App.scss";


import Item2 from "./components/item/item2.component";
import Search from "./components/search/search.component";

function App() {
  const search = useSelector((state) => state.search); // redux name in rootReducer
  const dispatch = useDispatch();

  const [array, setArray] = useState([]);

  useEffect(() => {
    console.log(search.currentSearch);
  }, [search]);


  useEffect(() => {
    if (search.loaded) {
      console.log("loaded data now ready to render");

      setArray(search.currentSearch.slice(0,5))
    }
  }, [search.loaded]);

  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchItem(idRef.current.value));
  };

  return (
    <div className="App">
      <h1>PoE Info</h1>
      <p className={search.fetching ? "green" : "red"}>
        {search.fetching.toString()}
      </p>
      <p className={search.loaded ? "green" : "red"}>
        {search.loaded.toString()}
      </p>
      <button onClick={() => dispatch(grabAPI())}>Test Me</button>

      <form onSubmit={handleSubmit}>
        <input ref={idRef} type="text" key="key1" placeholder="Test ID Here" />

        <input type="submit" value="Submit" key="key2" />
      </form>

      { search.loaded &&
        array.map((searchElement) => (
          <Item2 itemId={searchElement}/>
        )) 
      }


      <Search/>
    </div>
  );
}

export default App;
