import React from "react";

import "./App.scss";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// Pages
import SearchPage from "./page_parts/search/search.page";
import ResultsPage from "./page_parts/Results/results.page";

function App() {

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
