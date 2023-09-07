import React from "react";
import { useState } from "react";

function Form({ onAddItems, items }) {
  const [text, setText] = useState("");
  const [amt, setAmt] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      const newId = items.length + 1;
      const newItem = {
        id: newId,
        description: text,
        quantity: amt,
        packed: false,
      };
      onAddItems(newItem);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3 className="head">What to buy? 🔥</h3>
      <select value={amt} onChange={(e) => setAmt(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        name="itemName"
        type="text"
        value={text}
        placeholder="Item.."
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
