import { useEffect, useState } from "react";
import db from "./nedb/items";
import "./App.css";
import { ArchiveItems } from "./Components/ArchiveItems";

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
      <ArchiveItems items={items} setItems={setItems} />
  </div>
  );
}

export default App;
