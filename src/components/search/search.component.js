import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuery, grabAPI } from "../../redux/search/search.actions";

import { stack, accessories, armours } from "../../AutoComplete";

import "./search.component.scss";

const Search = ({ className }) => {
  /*
    Build Query Object

    Enter name of item,
    then send query to api,
    then get the search result response back,
    then send Items each id returned.
    
    */
  const search = useSelector((state) => state.search); // redux name in rootReducer
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeOption, setActiveOption] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  const searchQuery = {
    query: {
      filters: {
        trade_filters: {
          disabled: false,
          filters: {
            price: {
              min: 1,
              max: 100,
            },
          },
        },
      },
      status: {
        option: "online",
      },
      stats: [
        {
          type: "and",
          filters: [],
        },
      ],
      name,
    },
    sort: {
      price: "asc",
    },
  };

  // DISPATCH
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchQuery, "QUERY JSON");
    dispatch(updateQuery(searchQuery));
    console.log(search, "AFTER SUBMIT");
    dispatch(grabAPI(searchQuery));
  };

  // Prevent Enter to Dispatch
  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  // AUTOCOMPLETE Funcs
  const onChange = (e) => {
    setName(e.target.value);
    setShowOptions(true);
    setActiveOption(0);
    searchItemsToComplete(e.target.value);
  };

  const onClick = (e) => {
    setActiveOption(0);
    setShowOptions(false);
    console.log(e.currentTarget.innerText);
    setName(e.currentTarget.innerText);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setShowOptions(false);
      setActiveOption(0);
      setName(suggestions[activeOption]);
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setActiveOption(activeOption - 1);
    } else if (e.keyCode === 40) {
      if (activeOption === suggestions.length - 1) {
        console.log(activeOption);
        return;
      }
      setActiveOption(activeOption + 1);
    }
  };

  const preventEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const searchItemsToComplete = (searchText) => {
    // Get matches to current text input

    let suggestions = [];
    if (searchText.length > 0) {
      const regex = new RegExp(`^${searchText}`, "gi");
      suggestions = stack.sort().filter((item) => {
        return item.match(regex);
      });
    }

    setSuggestions(suggestions);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }

    if (showOptions === false) {
      return null;
    }

    return (
      <ul>
        {suggestions.map((item, index) => {
          let className;

          if (index === activeOption) {
            className = "active";
          }

          return (
            <li key={item} className={className} onClick={onClick}>
              {item}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="search__input-bar">
      <form
        id="search-form"
        onKeyDown={onKeyPress}
        onSubmit={handleSubmit}
        className="AutoCompleteText"
      >
        <input
          className="search__search-box"
          type="text"
          key="Potato"
          onChange={onChange}
          onClick={onClick}
          onKeyDown={onKeyDown}
          value={name}
          placeholder="Search Item Here"
        />
        {renderSuggestions()}
        {/*SubmitButton is in SearchPage */}
        <div className="search__select-box">
          <select className="search__select" name="leagues">
            <option value="heist">Heist</option>
            <option value="hardcoreHeist">Hardcore Heist</option>
            <option value="standard">Standard</option>
            <option value="hardcore">Hardcore</option>
          </select>
          <select className="search__select" name="online">
            <option value="onlineOnly">Online Only</option>
            <option value="any">Any</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Search;

// trace

/*

Need to get the search in here then call Item



*/
