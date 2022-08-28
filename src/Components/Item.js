import db from "../nedb/items";
import "../App.css";

const { shell } = require('electron');

export const Item = ({ item, idx, items, setItems }) => {

  const deleteItem = (e) => {
    e.preventDefault();
    db.remove({ _id: item._id }, {}, (err, numRemoved) => {
      if (!err) {
        console.log("DELETED: ", item._id);
        setItems([...items.slice(0, idx), ...items.slice(idx + 1)]);
      }
    });
  };

  const openLink = (e, url) => {
    
    alert('hello')
    shell.openExternal(url);
  };

  return (
    <div className="item">
      <h5 class="card-title">{item.title}</h5>  
      <p class="card-text">{item.snippet}</p>
      <a href="{item.link}" class="card-link" onClick={openLink(item.link)}>link</a>
      
      <div className="date">
        {item.dateAdded}
        <button className="delete" onClick={deleteItem}>
          delete
        </button>
      </div>
    </div>
  );
};
