import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

export default function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Live In Your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            amet voluptate reiciendis sequi quis, at optio debitis numquam id
            saepe. Sapiente nostrum ipsum nihil quibusdam dignissimos quia,
            suscipit odit accusamus.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>12+</h1>
              <h2>Year of Experience</h2>
            </div>
            <div className="box">
              <h1>162</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>1800+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="./bg.png" alt="hero" />
      </div>
    </div>
  );
}
