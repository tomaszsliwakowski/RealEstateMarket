import Card from "../../components/card/card";
import Filter from "../../components/filter/filter";
import Map from "../../components/map/map";
import { listData } from "../../lib/data";
import "./listPage.scss";

export type exampleDataType = {
  id: number;
  title: string;
  img: string;
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
};

export default function ListPage() {
  const data: exampleDataType[] = listData;
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data} />
      </div>
    </div>
  );
}
