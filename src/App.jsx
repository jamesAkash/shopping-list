import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

function App() {
  const [items, setItems] = useState(initialItems);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearList() {
    setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form items={items} onAddItems={handleAddItems} />
      <ShoppingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>Shopping List!🛒</h1>;
}

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
function ShoppingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
            {...item}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description </option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

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

export default App;
