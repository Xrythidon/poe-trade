import React, { useState, useEffect } from "react";
import API from "../../search-api";
import { useSelector, useDispatch } from "react-redux";
import {receivedError} from "../../redux/search/search.actions"

import chaosCurrency from "../../images/ChaosOrb.png";
import seperator from "../../images/seperator-unique.png";
import "./item.component.scss";


const Item2 = ({ itemId }) => {
  const search = useSelector((state) => state.search); // redux name in rootReducer
  const dispatch = useDispatch();

  const [item, setItem] = useState({});
  const [fetched, setFetched] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    let mounted = true;

    // handle error here
    API.getItem(itemId)
      .then((data) => {
        if(data.code === 3) {
          dispatch(receivedError(data.message));
          return;
        }

        
        if (mounted) {
          setItem(data);
          console.log("THIS IS THE DATA", data);
          setFetched(!fetched);
        }
      })

    return () => (mounted = false);

  }, []);

  useEffect(() => {
    // Long Destructure


    if (fetched) {
      if(Object.keys(item).length === 0) {
        return;
      }

      let {
        id, // rename
        item: { icon: image, ilvl: ilvl, name: itemName, explicitMods: explicitMods, corrupted: corrupted, implicitMods: implicitMods, sockets: sockets },
        listing: {
          account: { name: accountName, lastCharacterName: playerName },
          price: { amount: cost, currency: currencyCost },
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
        sockets
      });

    }
  }, [fetched]);

  const handleClipboard = (e) => {
    
  }

  const handleSockets = (socketsArray) => {
    let stringBuilder = "";

    let groupOneString = "";
    let groupTwoString = " ";

    for(let i = 0; i < socketsArray.length; i++ ){
      for(let j = i; j < socketsArray.length; j++ ){
        if (socketsArray[j].group === i) { 

          if (i === 0) { // group 0
            groupOneString += socketsArray[j].sColour + "-";
          }

          if (i === 1) { 
            groupTwoString += socketsArray[j].sColour + "-";
          }



        }

      }
    }

    stringBuilder = groupOneString.substring(0, groupOneString.length - 1) + groupTwoString.substring(0, groupTwoString.length - 1);

    return stringBuilder;

  }

  const parseSocketColour = (socketString) => {
    let array = socketString.split("");

    for (var i = 0; i < array.length; i++) {
      if(socketString[i] === "R") {
          array[i] = <span key={i} className="red">R</span>
      }
      if(socketString[i] === "G") {
          array[i] = <span key={i} className="green">G</span>
      }
      if(socketString[i] === "B") {
          array[i] = <span key={i} className="blue">B</span>

    }
  }
  return array;
}


  const { image, itemName, cost, currencyCost, playerName, ilvl, explicitMods, implicitMods, corrupted, sockets} = item;
  return fetched ? (
    <div className="result">
      <div className="result__container">
        <div className="icon__container">
          <img className="icon" src={image} alt="" />
          <div className="icon__text-box">
            <p className="icon__text">
              {
                sockets && <span className="icon__links">{parseSocketColour(handleSockets(sockets))}</span>
              }
            </p>
          </div>
        </div>

        <div className="item__box">
          <div className="name__box">
          <h2 className="item__name">{itemName}</h2>
          {corrupted && <p className="item__corrupted">(Corrupted)</p> }
          </div>
  <p className="item__ilvl">Item Level: {ilvl}</p>
          <ul className="item__implicits">
          {/*Put seperator here, add conditional for implicitMods exist */}
          {
          implicitMods && <span className="seperator"></span>
          }
          {implicitMods && (  implicitMods.map((implicitMod) => <li key={implicitMod} className="item__implicit">{implicitMod}</li>))}
          {
          implicitMods && <span className="seperator"><img src={seperator} alt=""/></span>
          } 
          </ul>


          <ul className="item__explicits">
            {
              explicitMods && explicitMods.map((explicitMod) => <li key={explicitMod} className="item__explicit">{explicitMod}</li> )
            }
          </ul>
          <div className="item__sale-box">
            <div className="item__price-box">
              <p className="item__price">{cost && ( cost + " " + currencyCost)}</p>
              <img
                src="pathofexile.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?v=c60aa876dd6bab31174df91b1da1b4f9"
                alt=""
                className="currency-icon"
                width="24px"
              />
            </div>
            <div className="item__status">
              <span className="status__online">Online</span>
              <span className="status__name">{" "}IGN: {playerName} {" "}</span>
              <button className="status__whisper btn"> Whisper</button>
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

https://www.youtube.com/watch?v=d_BuEAl_CVM

    let {
        id, // rename
        item: {
            icon: image,
            ilvl: ilvl,
            name: itemName,
        },
        listing: {
            account: {
                name: accountName,
                lastCharacterName: playerName
            },
            price: {
                amount: cost,
                currency: currencyCost

            }
        }
      } = item;

      
        <div>
        <div>
          <h1>Item Name: {itemName}</h1>
          <img src={image} alt="" />
          <p>price: {cost + " " + currencyCost}</p>
          <p>player Name: {playerName}</p>
        </div>
      </div>




*/
