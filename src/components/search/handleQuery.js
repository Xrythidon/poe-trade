  // Helper Function, Deal with label cases
  // A Helper class with String = Types (enum)

  import { APIQueryTypes } from "../../API/APIQueryTypes";

  export const handleNameQuery = (name, currentCategoryName) => {
    // Before we dispatch we fire handleQuery to handle different categorized types


    // check which category name belongs


    switch (currentCategoryName) {
      case APIQueryTypes.Weapons:
      case APIQueryTypes.Armours:
      case APIQueryTypes.Accessories:
        return {
          status: {
            option: "online",
          },
          name: name
        }
      case APIQueryTypes.Currency:
        return {
          status: {
            option: "online",
          },
          type: name
        }
      case APIQueryTypes.Cards:
        return {
          status: {
            option: "online",
          },
          type: name
        }
      default:
        return {
          status: {
            option: "online",
          },
          name: "potato"
        }
    }

  }
