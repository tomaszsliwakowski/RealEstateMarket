import "./singlePage.scss";
import Features from "../../components/singlePage/features";
import Slider from "../../components/slider/slider";
import { useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { PostType } from "../../utils/loaders";

export default function SinglePage() {
  const post = useLoaderData() as PostType;

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="./pin.png" alt="address" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar || "./noavatar.jpg"} alt="user" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post?.postDetail?.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <Features post={post} />
    </div>
  );
}
