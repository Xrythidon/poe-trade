import React, {useState, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { grabAPI } from "./redux/search/search.actions";
import { fetchItems } from "./redux/item/item.actions";
import "./App.css";

function App() {
  const state = useSelector((state) => state.search); // redux name in rootReducer
  const item = useSelector((state) => state.item); // redux name in rootReducer
  console.log(state.currentSearch);
  console.log(item);
  const dispatch = useDispatch();


  const idRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(idRef.current.value)

    dispatch(fetchItems(idRef.current.value))
  };

  return (
    <div className="App">
      <h1>PoE Info</h1>
      <p>{state.fetching.toString()}</p>
      <button onClick={() => dispatch(grabAPI())}>Test Me</button>

      <form action="">
        <input ref={idRef} type="text" placeholder="Test ID Here" />

        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default App;
