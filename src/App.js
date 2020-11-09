import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { grabAPI } from "./redux/search/search.actions";
import "./App.scss";
import Search from "./components/search/search.component";
import Items from "./components/items/items.component";

function App() {
  const search = useSelector((state) => state.search); // redux name in rootReducer
  const dispatch = useDispatch();

  const [array, setArray] = useState([]);

  useEffect(() => {
    //console.log(search.currentSearch);
  }, [search]);


  useEffect(() => {
    if (search.loaded) {
      console.log("loaded data now ready to render");

      setArray(search.currentSearch.slice(0,5))
    }
  }, [search.loaded]);



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

      <Search/>
      <Items/>
    </div>
  );
}

export default App;
