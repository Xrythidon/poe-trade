import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuery, grabAPI } from "../../redux/search/search.actions";

import { accessories, armours } from "../../AutoComplete";


const AutoComplete = () => {

  const [state, setState] = useState({
    activeOption: 0,
    filteredOptions: [],
    showOPtions: false,
    userInput: "",
  })


  const nameChange = (e) => {
    e.preventDefault();

    const userInput = e.target.value

   const filteredOptions = searchItemsToComplete(e.target.value)

    setState({...state, userInput, filteredOptions})


  };

  const searchItemsToComplete = (searchText) => {
    // Get matches to current text input

    let suggestions = [];
    if (searchText.length > 0) {
      const regex = new RegExp(`^${searchText}`, "gi");
      suggestions = accessories.sort().filter((item) => {
        return item.match(regex);
      });
    }
    return suggestions;
    /*
    let armourMatches = armours.sort().filter((item) => {
      return item.match(regex);
    });

    console.log(accessoryMatches.slice(0, 5));
    console.log(armourMatches.slice(0, 5));
    */
  };

  const renderSuggestions = () => {
    const suggestions = state.filteredOptions;


    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <form  className="AutoCompleteText">
        <input
          type="text"
          key="Potato"
          onChange={nameChange}
          placeholder="Search Item Here"
        />
        {renderSuggestions()}
        <input type="submit" value="Submit" />
      </form>
      <h1>TEST</h1>
    </div>
  );
};

export default AutoComplete;

// trace

/*

Need to get the search in here then call Item



*/
