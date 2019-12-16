import React from "react";
import PropTypes from "prop-types";

const ListGroup = props => {
  const {
    items,
    onItemSelect,
    textProperty,
    keyProperty,
    selectedGenre
  } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          className={
            selectedGenre === item
              ? "list-group-item active"
              : "list-group-item"
          }
          key={item[keyProperty]}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.propTypes = {
  items: PropTypes.array,
  onItemSelect: PropTypes.func,
  textProperty: PropTypes.string,
  keyProperty: PropTypes.string
};
export default ListGroup;
