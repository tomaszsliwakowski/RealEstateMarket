import { PostType } from "../../utils/loaders";
import Card from "../card/card";
import "./list.scss";

type PROPS = {
  posts: PostType[];
};

export default function List({ posts }: PROPS) {
  return (
    <div className="list">
      {posts.length > 0
        ? posts.map((item) => <Card key={item.id} item={item} />)
        : null}
    </div>
  );
}
