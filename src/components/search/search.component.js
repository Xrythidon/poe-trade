import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuery, grabAPI } from "../../redux/search/search.actions";

import { stack, result } from "../../AutoComplete";

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
      name: name,
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

  const handleError = () => {

  }

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
    console.log(e.currentTarget.innerText);
    setName(e.currentTarget.innerText);
  };



  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log(categories);
      console.log(suggestions[currentCategory], currentCategory, "suggestions");

      console.log(suggestions[currentCategory]["entries"][activeOption]); // <--- Fix this? Undefined?

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
          console.log("ROOF");
          return;
        }
      }
      if (activeOption < 1 && currentCategory > 0) {
        console.log("triggering?");
        setCurrentCategory(currentCategory - 1);
        setActiveOption(lengthOfPreviousCategorySuggestions - 1);

        // setActiveOption as the length of the previous category
      } else {
        setActiveOption(activeOption - 1);
      }

      console.log(currentCategory, "currentCategory");
      console.log(activeOption, "activeOption");
    } else if (e.keyCode === 40) {
      const lengthOfCurrentCategorySuggestions =
        suggestions[currentCategory]["entries"].length;
      const lengthOfLastCategorySuggestions =
        suggestions[categories.length - 1]["entries"].length;
      const lastCategory = suggestions[categories.length - 1]["label"];
      console.log(
        lastCategory,
        suggestions[currentCategory]["label"],
        "lastcategory"
      );

      if (suggestions[currentCategory]["label"] === lastCategory) {
        if (activeOption === lengthOfLastCategorySuggestions - 1) {
          console.log("FLOOR");
          return;
        }
      }

      if (activeOption === lengthOfCurrentCategorySuggestions - 1) {
        if (categories[currentCategory + 1] === undefined) {
          console.log("next category doesn't exist");
          return;
        } else {
          setCurrentCategory(currentCategory + 1);
          setActiveOption(0);
        }
        console.log(activeOption, currentCategory, "HIT THE NEXT CATEGORY");
        return;
      }
      setActiveOption(activeOption + 1);

      console.log(currentCategory, "currentCategory");
      console.log(activeOption, "activeOption");
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
    console.log(suggestions);
    // console.log(categories);

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
