import React, { useState, useEffect } from "react";
import API from "../../API/search-api";
import { useSelector, useDispatch } from "react-redux";
import { receivedError } from "../../redux/search/search.actions";
import seperator from "../../images/seperator-unique.png";
import { getCurrencyImg } from "./currencyTypes";
import "./item.component.scss";

import ClipboardJS from "clipboard";


const Item2 = ({ itemId }) => {
  const clipboard = new ClipboardJS(".status__whisper");
  const dispatch = useDispatch();

  const [item, setItem] = useState({});
  const [fetched, setFetched] = useState(null);

  const [whisperText, setWhisperText] = useState("Whisper")

  useEffect(() => {
    let mounted = true;

    // handle error here
    API.getItem(itemId).then((data) => {
      if (data.code === 3) {
        dispatch(receivedError(data.message));
        return;
      }

      if (mounted) {
        setItem(data);
        setFetched(!fetched);
      }
    });

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    // Long Destructure

    if (fetched) {
      if (Object.keys(item).length === 0) {
        return;
      }

      let {
        id, // rename
        item: {
          icon: image,
          ilvl: ilvl,
          name: itemName,
          explicitMods,
          corrupted,
          implicitMods,
          sockets,
          league,
        },
        listing: {
          account: { name: accountName, lastCharacterName: playerName },
          price: { amount: cost, currency: currencyCost },
          stash: { name: stashName, x: stashLeft, y: stashTop },
        },
      } = item;

      // Putting the destructured variables back into
      // Item to destructure for render
      setItem({
        id,
        image,
        ilvl,
        itemName,
        accountName,
        playerName,
        cost,
        currencyCost,
        explicitMods,
        corrupted,
        implicitMods,
        sockets,
        stashName,
        stashLeft,
        stashTop,
        league
      });
    }
  }, [fetched]);

  const handleSockets = (socketsArray) => {
    let stringBuilder = "";

    let groupOneString = "";
    let groupTwoString = " ";

    for (let i = 0; i < socketsArray.length; i++) {
      for (let j = i; j < socketsArray.length; j++) {
        if (socketsArray[j].group === i) {
          if (i === 0) {
            // group 0
            groupOneString += socketsArray[j].sColour + "-";
          }

          if (i === 1) {
            groupTwoString += socketsArray[j].sColour + "-";
          }
        }
      }
    }

    stringBuilder =
      groupOneString.substring(0, groupOneString.length - 1) +
      groupTwoString.substring(0, groupTwoString.length - 1);

    return stringBuilder;
  };

  const parseSocketColour = (socketString) => {
    let array = socketString.split("");

    for (var i = 0; i < array.length; i++) {
      if (socketString[i] === "R") {
        array[i] = (
          <span key={i} className="red">
            R
          </span>
        );
      }
      if (socketString[i] === "G") {
        array[i] = (
          <span key={i} className="green">
            G
          </span>
        );
      }
      if (socketString[i] === "B") {
        array[i] = (
          <span key={i} className="blue">
            B
          </span>
        );
      }
    }
    return array;
  };

  const changeWhisperText = (e) => {
    setWhisperText("Copied")
  }

  const {
    image,
    itemName,
    cost,
    currencyCost,
    playerName,
    ilvl,
    explicitMods,
    implicitMods,
    corrupted,
    sockets,
    stashName,
    stashLeft,
    stashTop,
    league,
  } = item;
  return fetched ? (
    <div className="result">
      <div className="result__container">
        <div className="icon__container">
          <img className="icon" src={image} alt="" />
          <div className="icon__text-box">
            <p className="icon__text">
              {sockets && (
                <span className="icon__links">
                  {parseSocketColour(handleSockets(sockets))}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="item__box">
          <div className="name__box">
            <h2 className="item__name">{itemName}</h2>
            {corrupted && <p className="item__corrupted">(Corrupted)</p>}
          </div>
          <p className="item__ilvl">Item Level: {ilvl}</p>
          <ul className="item__implicits">
            {/*Put seperator here, add conditional for implicitMods exist */}
            {implicitMods && <span className="seperator"></span>}
            {implicitMods &&
              implicitMods.map((implicitMod) => (
                <li key={implicitMod} className="item__implicit">
                  {implicitMod}
                </li>
              ))}
            {implicitMods && (
              <span className="seperator">
                <img src={seperator} alt="" />
              </span>
            )}
          </ul>

          <ul className="item__explicits">
            {explicitMods &&
              explicitMods.map((explicitMod) => (
                <li key={explicitMod} className="item__explicit">
                  {explicitMod}
                </li>
              ))}
          </ul>
          <div className="item__sale-box">
            <div className="item__price-box">
              <p className="item__price">{cost && cost + " " + currencyCost}</p>
              {currencyCost && (
                <img
                  src={getCurrencyImg(currencyCost)}
                  alt=""
                  className="currency-icon"
                  width="24px"
                />
              )}
            </div>
            <div className="item__status">
              <span className="status__online">Online</span>
              <span className="status__name"> IGN: {playerName} </span>
              <button
                onClick={changeWhisperText}
                className="status__whisper btn"
                data-clipboard-text={`@${playerName} Heya, I would like to buy your ${itemName} listed for ${cost} ${currencyCost} in ${league} (Stash: "${stashName}", position: left ${
                  stashLeft + 1
                }, top ${stashTop + 1})`}
              >
                {whisperText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Item2;

/*
@janopn Hi, I would like to buy your Tabula Rasa Simple Robe listed for 1 chaos in Standard (stash tab "Sarlanga"; position: left 1, top 6)
@testerbot Hi, I would like to buy your Tabula Rasa Simple Robe listed for 10 chaos in Standard (stash tab "Uniques"; position: left 7, top 1)
*/
