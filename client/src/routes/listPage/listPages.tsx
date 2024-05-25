import { Await, useLoaderData } from "react-router-dom";
import Card from "../../components/card/card";
import Filter from "../../components/filter/filter";
import Map from "../../components/map/map";
import "./listPage.scss";
import { Suspense } from "react";
import { PostType } from "../../utils/loaders";

type DataType = {
  postResponse: Promise<PostType[]>;
};

export default function ListPage() {
  const posts = useLoaderData() as DataType;

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={posts.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post: PostType) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={posts.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
