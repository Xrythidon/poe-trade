import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    post(
      "https://www.pathofexile.com/api/trade/search/Standard"
    );
  }, []);

  async function post(postRequest) {
    try {
      const response = await axios.post(postRequest, {
          "query": {
            "filters": {
              "trade_filters": {
                "disabled": false,
                "filters": {
                  "price": {
                    "min": 1,
                    "max": 100
                  }
                }
              }
            },
            "status": {
              "option": "online"
            },
            "stats": [
              {
                "type": "and",
                "filters": []
              }
            ],
            "name": "Tabula Rasa",
            "type": "Simple Robe"
          },
          "sort": {
            "price": "asc"
          }
      })
      console.log(response.data.result);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="App">
      <h1>Potato</h1>
    </div>
  );
}

export default App;
