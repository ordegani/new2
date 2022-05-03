import Painting from "./Painting";
import React, { useEffect, useState, browserHistory } from "react";
import "./maincontainer.css";
import Btn from "../btn";

const Form = ({ setsave, save }) => {
  const [paintings, setPaintings] = useState([]);
  const [search, setSearch] = useState("");
  const [SessionKey, setSessionKey] = useState("");

  const getSessionKey = async () => {
    const response = await fetch(
      `https://api.codetabs.com/v1/proxy?quest=https://www.wikiart.org/en/Api/2/login?accessCode=8152dc79d3a84b65&secretCode=8e713d5e00346e24`
    );
    const Data1 = await response.json();
    setSessionKey(Data1.hits);
    console.log(Data1.hits);
  };
  useEffect(() => {
    getSessionKey();
  }, []);
  console.log(SessionKey);

  const getPaintings = async () => {
    console.log("fetching");
    const response = await fetch(
      `https://api.codetabs.com/v1/proxy?quest=http://www.wikiart.org/en/App/Painting/PaintingsByArtist?artistUrl=${query}&json=2&authSessionKey=${SessionKey}`
    );
    const Rawdata = await response.json();
    // const data = JSON.stringify(Rawdata).toLowerCase().replace(/ /g,"-");
    setPaintings(Rawdata);
    console.log(Rawdata);
  };

  const flavourArray = [
    "john-everett-millais",
    "edward-hopper",
    "michelangelo-merisi-da-caravaggio",
    "gustav-klimt",
    "claude-monet",
    "lucian-freud",
  ];
  const ran = Math.floor(Math.random() * flavourArray.length);
  const searcher = flavourArray[ran];
  const [query, setQuery] = useState(searcher);

  useEffect(() => {
    getPaintings();
  }, [query]);

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search.toLowerCase().replace(/ /g, "-"));
    setSearch("");
  };
  ///////////
  const [favourites, setFavourites] = useState([]);

  const addTofavourites = (saved) => {
    setFavourites([...favourites, saved]);
    setsave(saved);
    if (!window.confirm('Saved! Click "ok" or "cancel" to unsave')) {
      if (window.confirm("Want to re-search?")) {
        window.location.reload();
      }
    }
    console.log(favourites);
    setsave(saved);
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="maincontainer">
      <div className="paintings">
        <div className="explore">
          Explore our suggestion: <br />
          {query}'s work
          <button className="refresh" type="submit" onClick={refreshPage}>
            Give me a new suggestion
          </button>
        </div>
        {/* <form onSubmit={getSearch} className="search-form"> */}

        {/* <input
          className="search-bar"
          placeholder="Or type here your search"
          type="text"
          value={search}
          onChange={updateSearch}
        /> */}

        {/* <button
          className="search-button"
          type="Submit"
        >
          Search
        </button> */}

        {/* </form> */}

        {/* <div>{painting.artistname}</div> */}
        {paintings.slice(paintings.length - 10).map((painting, index) => (
          <Painting
            key={painting.index}
            id={painting.index}
            image={painting.image.replace("!Large.jpg", "")}
            artistName={painting.artistName}
            title={painting.title}
            completitionYear={painting.completitionYear}
            onClick={addTofavourites}
            buttonText="Save"
            // onClick={AddTofavourites}
            // buttonText="Save"
            onClick2={() => setsave(false)}
          />
        ))}
      </div>
    </div>
  );
};

export default Form;
