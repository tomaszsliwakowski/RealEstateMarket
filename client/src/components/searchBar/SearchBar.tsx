import { useState } from "react";
import "./searchBar.scss";
import Button from "../button/button";

type QueryType = {
  type: string;
  location: string;
  minPrice: number;
  maxPrice: number;
};

const types = ["buy", "rent"];

export default function SearchBar() {
  const [query, setQuery] = useState<QueryType>({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (newType: string) => {
    setQuery((prev) => ({ ...prev, type: newType }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type, id) => (
          <button
            className={query.type === type ? "active" : ""}
            key={id}
            onClick={() => switchType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input type="text" name="location" placeholder="City Location" />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
        />
        <Button imgSrc="./search.png" />
      </form>
    </div>
  );
}
