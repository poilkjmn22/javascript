import React from "react";
import PropTypes from "prop-types";
import BugRecordCard from "./bug-record-card.jsx";

const BugRecordCardList = (props) => {
  return (
    <div className="bug-record-card-list">
      {props.items.map((item, idx) => {
        return (
          <BugRecordCard
            handleClickCard={props.handleClickCard}
            handleDelete={props.handleDelete}
            key={idx}
            bugRecord={item}
          />
        );
      })}
    </div>
  );
};
BugRecordCardList.defaultProps = {
  items: PropTypes.array.isRequired,
  handleClickCard: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default BugRecordCardList;
