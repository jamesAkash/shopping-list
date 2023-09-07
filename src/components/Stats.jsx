import React from "react";

function Stats({ items }) {
  const len = items.length;
  const packed = items.filter((item) => item.packed === true);
  const packedPercent = Math.floor((packed.length / len) * 100);
  console.log(packedPercent);
  return (
    <footer className="stats">
      <em>
        You have <span style={{ color: "blue" }}>{len} items</span> on your list
        {packed.length > 0 && (
          <p>
            you already packed -
            {packed.map((items, i) => {
              return (
                <span key={i} style={{ color: "green", display: "block" }}>
                  {items.description}
                </span>
              );
            })}
            ({packedPercent}%)
          </p>
        )}
      </em>
    </footer>
  );
}

export default Stats;
