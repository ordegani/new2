import React from "react";
import "./maincontainer.css";
import Btn from "../btn";

const Painting = ({
  image,
  artistName,
  title,
  completitionYear,
  buttonText,
  onClick,
  onClick2,
}) => {
  return (
    <div className="paintingsContainer">
      <h3>
        {artistName}, {title} {completitionYear}
      </h3>

      <img className="image" src={image} alt="" />
      <div className="btnContainer">
        <button
          className="savedList"
          onClick={() =>
            onClick({ title, image, artistName, completitionYear })
          }
          type="Submit"
        >
          {buttonText}
        </button>

        <Btn />
        <button
          className="cancelChoiceBtn"
          type="submit"
          onClick={() => onClick2()}
        >
          Cancel choice
        </button>
      </div>
    </div>
  );
};

export default Painting;
