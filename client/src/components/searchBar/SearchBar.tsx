import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        <input
          type="text"
          name="location"
          placeholder="City Location"
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link
          to={`/list?type=${query.type}&city=${query.location}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button>
            <img src="./search.png" alt="search" />
          </button>
        </Link>
      </form>
    </div>
  );
}
