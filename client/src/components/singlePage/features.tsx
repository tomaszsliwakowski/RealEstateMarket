import Map from "../map/map";
import Feature from "./feature";
import "./features.scss";
import Size from "./size";
import useSinglePageFeatures from "./singlePageHelper";

type PROPS = {
  post: any;
};

export default function Features({ post }: PROPS) {
  const { saved, handleSave } = useSinglePageFeatures(post.isSaved, post.id);
  return (
    <div className="features">
      <div className="wrapper">
        <p className="title">General</p>
        <div className="listVertical">
          <Feature
            imgSrc="./utility.png"
            title="Utilities"
            text={
              post.postDetail.utilities === "owner"
                ? "Owner is responsible"
                : "Tenant is responsible"
            }
          />
          <Feature
            imgSrc="./pet.png"
            title="Pet Policy"
            text={
              post.postDetail.pet === "allowed"
                ? "Pets Allowed"
                : "Pets not Allowed"
            }
          />
          <Feature
            imgSrc="./fee.png"
            title="Income Policy"
            text={post.postDetail.income}
          />
        </div>
        <p className="title">Sizes</p>
        <div className="sizes">
          <Size imgSrc="./size.png" text={`${post.postDetail.size} sqft`} />
          <Size imgSrc="./bed.png" text={`${post.bedroom} beds`} />
          <Size imgSrc="./bath.png" text={`${post.bathroom} bathroom`} />
        </div>
        <p className="title">Nearby Places</p>
        <div className="listHorizontal">
          <Feature
            imgSrc="./school.png"
            title="School"
            text={
              post.postDetail.school > 999
                ? `${post.postDetail.school / 1000 + "km"}`
                : `${post.postDetail.school + "m"}{" "}
                    away}`
            }
          />
          <Feature
            imgSrc="./pet.png"
            title="Bus Stop"
            text={`${post.postDetail.bus + " m away"}`}
          />
          <Feature
            imgSrc="../fee.png"
            title="Restaurant"
            text={`${post.postDetail.restaurant + " m away"}`}
          />
        </div>
        <p className="title">Location</p>
        <div className="mapContainer">
          <Map items={[post]} />
        </div>
        <div className="buttons">
          <button>
            <img src="./chat.png" alt="" />
            Send a Message
          </button>
          <button
            onClick={() => handleSave()}
            className={saved ? "true" : "false"}
          >
            <img src="./save.png" alt="" />
            {saved ? "Place Saved" : "Save the Place"}
          </button>
        </div>
      </div>
    </div>
  );
}
