const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <ShoppingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Shop it!🛒</h1>;
}

function Form() {
  return (
    <form className="add-form">
      <h3>What to buy? 🔥</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item.." />
      <button>Add</button>
    </form>
  );
}
function ShoppingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
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
