import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type QueryType = {
  type: string;
  city: string;
  property: string;
  minPrice: string;
  maxPrice: string;
  bedroom: string;
};

export default function useFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<QueryType>({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };
  const handleFilter = () => {
    setSearchParams(query);
  };
  return { searchParams, handleChange, handleFilter, query };
}
