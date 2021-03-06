import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuery, grabAPI } from "../../redux/search/search.actions";
import { stack, result } from "../../API/AutoComplete";
import { handleNameQuery } from "./handleQuery";

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
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [activeOption, setActiveOption] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  // DISPATCH
  const handleSubmit = (e) => {
    const currentCategoryName = suggestions[currentCategory]["label"];

    const searchQuery = {
      query: handleNameQuery(name, currentCategoryName),
      sort: {
        price: "asc",
      },
    };

    e.preventDefault();
    // before we dispatch, we change the query based on the type of item
    // make a case statement for each different type

    dispatch(updateQuery(searchQuery));
    dispatch(grabAPI(searchQuery));
    setName("");
    setCurrentCategory(0);
  };

  const handleError = () => {};

  // Prevent Enter to Dispatch
  const onKeyPress = (e) => {
    if (showOptions === true) {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
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
    setName(e.currentTarget.innerText);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {

      setName(suggestions[currentCategory]["entries"][activeOption]);
      setShowOptions(false);
    } else if (e.keyCode === 38) {
      const lengthOfPreviousCategorySuggestions = suggestions[
        currentCategory - 1
      ]
        ? suggestions[currentCategory - 1]["entries"].length
        : 0;

      // ON KEY UP ENTER DOES NOT WORK
      if (currentCategory <= 0) {
        if (activeOption <= 0) {
          return;
        }
      }
      if (activeOption < 1 && currentCategory > 0) {

        setCurrentCategory(currentCategory - 1);
        setActiveOption(lengthOfPreviousCategorySuggestions - 1);

        // setActiveOption as the length of the previous category
      } else {
        setActiveOption(activeOption - 1);
      }

    } else if (e.keyCode === 40) {
      const lengthOfCurrentCategorySuggestions =
        suggestions[currentCategory]["entries"].length;
      const lengthOfLastCategorySuggestions =
        suggestions[categories.length - 1]["entries"].length;
      const lastCategory = suggestions[categories.length - 1]["label"];


      if (suggestions[currentCategory]["label"] === lastCategory) {
        if (activeOption === lengthOfLastCategorySuggestions - 1) {
          return;
        }
      }

      if (activeOption === lengthOfCurrentCategorySuggestions - 1) {
        if (categories[currentCategory + 1] === undefined) {
          return;
        } else {
          setCurrentCategory(currentCategory + 1);
          setActiveOption(0);
        }
        return;
      }
      setActiveOption(activeOption + 1);

    }
  };

  const searchItemsToComplete = (searchText) => {
    // Get matches to current text input

    let suggestions = [];
    let categories = [];
    if (searchText.length > 0) {
      const regex = new RegExp(`^${searchText}`, "gi");

      // suggestions = stack.sort().filter((item) => {
      //   return item.match(regex);
      // });

      result.forEach((type) => {
        let entries = type["entries"].sort().filter((item) => {
          return item.match(regex);
        });

        suggestions.push({
          label: type["label"],
          entries: entries,
        });
        if (entries.length === 0) {
          suggestions.pop();
        }

        // Category handler
        categories.push(type["label"]);
        if (entries.length === 0) {
          categories.pop();
        }
      });
    }

    setCategories(categories);
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
        {suggestions.map((suggestion) => {
          return suggestion["entries"].map((item, index) => {
            let className;

            if (
              index === activeOption &&
              suggestion["label"] === categories[currentCategory]
            ) {
              className = "active";
            }

            return (
              <div key={item}>
                {index === 0 ? (
                  <h1 key={suggestion["label"]}>{suggestion["label"]}</h1>
                ) : null}
                <li key={item} className={className} onClick={onClick}>
                  {item}
                </li>
              </div>
            );
          });
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
            <option value="standard">Standard</option>
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
