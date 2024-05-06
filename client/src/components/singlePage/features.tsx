import Map from "../map/map";
import Feature from "./feature";
import "./features.scss";
import { singlePostData } from "../../lib/data";
import Size from "./size";
import Button from "../button/button";

export default function Features() {
  return (
    <div className="features">
      <div className="wrapper">
        <p className="title">General</p>
        <div className="listVertical">
          <Feature
            imgSrc="./utility.png"
            title="Utilities"
            text="Renter is responsible"
          />
          <Feature imgSrc="./pet.png" title="Pet Policy" text="Pets Allowed" />
          <Feature
            imgSrc="./fee.png"
            title="Property Fees"
            text="Must have 3x the rent in total household income"
          />
        </div>
        <p className="title">Sizes</p>
        <div className="sizes">
          <Size imgSrc="./size.png" text="80 sqft" />
          <Size imgSrc="./bed.png" text="2 beds" />
          <Size imgSrc="./bath.png" text="1 bathroom" />
        </div>
        <p className="title">Nearby Places</p>
        <div className="listHorizontal">
          <Feature imgSrc="./school.png" title="School" text="250m away" />
          <Feature imgSrc="./pet.png" title="Bus Stop" text="100m away" />
          <Feature imgSrc="../fee.png" title="Restaurant" text="200m away" />
        </div>
        <p className="title">Location</p>
        <div className="mapContainer">
          <Map items={[singlePostData]} />
        </div>
        <div className="buttons">
          <Button imgSrc="./chat.png" name="Send a Message" />
          <Button imgSrc="./save.png" name="Save the Place" />
        </div>
      </div>
    </div>
  );
}
