import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import Items from "./components/items/items.component";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// Pages
import SearchPage from "./page_parts/search/search.page";
import ResultsPage from "./page_parts/Results/results.page";

function App() {
  const search = useSelector((state) => state.search); // redux name in rootReducer
  const dispatch = useDispatch();

  const [array, setArray] = useState([]);

  useEffect(() => {
    //console.log(search.currentSearch);
  }, [search]);

  const authenticate = () =>{
     return new Promise(resolve => setTimeout(resolve, 2000)) // 2 seconds
  }

  useEffect(() => {
    if (search.loaded) {
      console.log("loaded data now ready to render");

      setArray(search.currentSearch.slice(0, 5));
    }
  }, [search.loaded]);
  
  useEffect(() => {
    authenticate().then(() => {
      const ele = document.getElementById("ipl-progress-indicator");
      if (ele) {
        // fade out
        ele.classList.add("available");
        setTimeout(() => {
          // remove from DOM
          ele.outerHTML = "";
        }, 2000);
      }
    });
  }, []);

  return (
    <div className="App">
      <ErrorBoundary>
        <SearchPage />
        <ResultsPage />
      </ErrorBoundary>
    </div>
  );
}

export default App;
