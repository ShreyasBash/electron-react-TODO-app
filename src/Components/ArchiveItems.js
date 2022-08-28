import "../App.css";
import { Item } from "./Item";

export const ArchiveItems = ({ items, setItems }) => {
  return (
    <div className="items-cont" style={{display:(items.length > 0 ? 'block':'none')}}>
      <i> showing results for </i>
      {items.map((val, idx) => (
        <Item
          key={val._id}
          item={val}
          idx={idx}
          items={items}
          setItems={setItems}
        />
      ))}
    </div>
  );
};
