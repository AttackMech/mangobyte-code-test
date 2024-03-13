import React, { useState } from "react";
import "./RatingsSection.css";
import Star from "../../../resources/star.svg";
import Check from "../../../resources/check.svg";

// TODO: Use real ratings info from a provider
const ratingInfo = {
  rating: 4.9,
  votes: "8,381",
};

const RatingsSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  const getStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.round(rating); i++) {
      stars.push(<img src={Star} alt="star" key={i} className="star" />);
    }
    return stars;
  };

  return (
    <div className="ratings" onClick={toggleOpenClose}>
      {isOpen ? <div className="openRatingsContent" /> : null}
      <div className="ratingsContent">
        <div>
          {getStars(ratingInfo.rating)}
          <span className="ratingText">{ratingInfo.rating}</span>
          <span className="voteText">{` (${ratingInfo.votes} votes)`}</span>
        </div>
        <div className="features">
          <img src={Check} alt="check" className="check" />
          <span className="featureText">Free</span>
          <img src={Check} alt="check" className="check featureSpacer" />
          <span className="featureText">Online</span>
          <img src={Check} alt="check" className="check featureSpacer" />
          <span className="featureText">No Limits</span>
        </div>
      </div>
    </div>
  );
};

export default RatingsSection;
