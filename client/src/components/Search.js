import Painting from "./form/Painting";
import React, { useEffect, useState } from "react";
//Access-Control-Allow-Origin : *
import "./form/maincontainer.css";
import { withRouter } from "react-router";

const Search = ({ setsave, save }) => {
  const [paintings, setPaintings] = useState([]);
  const [search, setSearch] = useState("");

  const [SessionKey, setSessionKey] = useState("");

  const getSessionKey = async () => {
    const response = await fetch(
      `https://api.codetabs.com/v1/proxy?quest=https://www.wikiart.org/en/Api/2/login?accessCode=7e4c1039eb054015&secretCode=a5c9d53cd206af8d`
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

  const [query, setQuery] = useState("");

  useEffect(() => {
    getPaintings();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search.toLowerCase().replace(/ /g, "-"));
    setSearch("");
  };
  ///////////
  const [favourites, setFavourites] = useState([]);

  const AddTofavourites = (saved) => {
    setFavourites([...favourites, saved]);

    console.log(favourites);
    setsave(saved);
    if (!window.confirm('Saved! Click "ok" or "cancel" to unsave')) {
      if (window.confirm("Want to re-search?")) {
        window.location.reload();
      }
    }
  };

  return (
    <div className="maincontainer">
      <div className="paintings">
        {/* <div className="explore">choose an artist</div> */}

        <form onSubmit={getSearch} className="search-form">
          <input
            className="search-bar"
            placeholder="choose an artist to explore"
            type="text"
            value={search}
            onChange={updateSearch}
          />

          <button className="search-button" type="Submit">
            Search
          </button>
        </form>

        {/* <div>{painting.artistname}</div> */}
        {paintings.slice(paintings.length - 10).map((painting, index) => (
          <Painting
            key={painting.index}
            id={painting.index}
            image={painting.image.replace("!Large.jpg", "")}
            //TODO add css to control size
            // !Large.jpg + copy api

            artistName={painting.artistName}
            title={painting.title}
            completitionYear={painting.completitionYear}
            onClick={AddTofavourites}
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

export default Search;
