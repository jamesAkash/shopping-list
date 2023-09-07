import React from "react";

const Item = ({
  id,
  quantity,
  description,
  packed,
  onDeleteItem,
  onToggleItem,
}) => {
  return (
    <li key={id} style={{ color: "#fff" }}>
      {/* {console.log(packed)} */}
      <input
        type="checkbox"
        checked={packed}
        onChange={() => onToggleItem(id)}
      />
      <span className={`${packed ? "strike listItem" : ""}`}>
        {quantity} {description}
      </span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
};
export default Item;
