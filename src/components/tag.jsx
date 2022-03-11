import React from 'react';

const Tag = (props) => {
  return (
    <span
      data-notecate={props.name}
      onClick={props.handleClick}
      className={`tag tag-${props.name}`}
    >
      {props.title}
    </span>
  );
};
export default Tag;
