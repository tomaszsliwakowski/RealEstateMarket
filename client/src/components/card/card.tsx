import { Link } from "react-router-dom";
import "./card.scss";
import { PostType } from "../../utils/loaders";

type PROPS = {
  item: PostType;
};

export default function Card({ item }: PROPS) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="image" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="./pin.png" alt="pin" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="./bed.png" alt="bed" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="./bath.png" alt="bath" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="./save.png" alt="save" />
            </div>
            <div className="icon">
              <img src="./chat.png" alt="chat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
