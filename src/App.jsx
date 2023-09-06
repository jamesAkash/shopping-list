import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

function App() {
  const [items, setItems] = useState(initialItems);
  return (
    <div className="app">
      <Logo />
      <Form items={items} setItems={setItems} />
      <ShoppingList items={items} />
      <Stats />
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
      <h3>What to buy? 🔥</h3>
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
function ShoppingList({ items }) {
  console.log(items);
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>you have X items on your list and you already packed X</em>
    </footer>
  );
}

const Item = ({ id, quantity, description, packed }) => {
  return (
    <li key={id} style={{ color: "#fff" }}>
      <input type="checkbox" />
      <span className={`${packed ? "strike" : ""}`}>
        {quantity} {description}
      </span>
      <button>❌</button>
    </li>
  );
};

export default App;
