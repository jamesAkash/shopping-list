import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

function App() {
  const [items, setItems] = useState(initialItems);
  return (
    <div className="app">
      <Logo />
      <Form items={items} setItems={setItems} />
      <ShoppingList items={items} setItems={setItems} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>Shop it!🛒</h1>;
}

function Form({ setItems, items }) {
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
      setItems([...items, newItem]);
    }
  };

  const [text, setText] = useState("");
  const [amt, setAmt] = useState(1);

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
function ShoppingList({ items, setItems }) {
  // console.log(items);
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item items={items} setItems={setItems} key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  const len = items.length;
  const packed = items.filter((item) => item.packed === true);
  return (
    <footer className="stats">
      <em>
        you have {len} items on your list and you already packed -
        {packed.map((items, i) => {
          return (
            <span key={i} style={{ color: "green" }}>
              {items.description},{" "}
            </span>
          );
        })}
      </em>
    </footer>
  );
}

const Item = ({ id, quantity, description, packed, items, setItems }) => {
  const deleteItem = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
  };
  const handleChange = (id) => {
    const checkUncheck = items.find((item) => item.id === id);
  };
  return (
    <li key={id} style={{ color: "#fff" }}>
      <input
        type="checkbox"
        checked={packed}
        onChange={() => handleChange(id)}
      />
      <span className={`${packed ? "strike" : ""}`}>
        {quantity} {description}
      </span>
      <button onClick={() => deleteItem(id)}>❌</button>
    </li>
  );
};

export default App;
