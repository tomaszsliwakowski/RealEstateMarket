import { listData } from "../../lib/data";
import Card from "../card/card";
import "./list.scss";

export default function List() {
  return (
    <div className="list">
      {listData.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}
