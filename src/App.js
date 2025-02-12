import { useEffect, useState } from "react";
import db from "./nedb/items";
import "./App.css";
import { SearchBox } from "./Components/SearchBox";
import { SearchItems } from "./Components/SearchItems";

function App() {
  const [items, setItems, loading] = useState([]);
  

  const getAllItems = () => {
    db.find({}, (err, docs) => {
      if (!err) {
        setItems(docs);
      }
    });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
  <div className="App">
      <SearchBox items={items} setItems={setItems} loading={loading} />
      <SearchItems items={items} setItems={setItems} />
  </div>

  );
}

export default App;
