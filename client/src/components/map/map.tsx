import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import { exampleDataType } from "../../routes/listPage/listPages";
import Pin from "../pin/pin";

type PROPS = {
  items: exampleDataType[];
};

export default function Map({ items }: PROPS) {
  return (
    <MapContainer
      center={[52.4797, -1.90269]}
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}
