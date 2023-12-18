import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useGetShop from "../hooks/shop/useGetShop";

function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [searchLocation, setSearchLocation] = useState<string>("all");
  const [searchString, setSearchString] = useState<string>("");

  const { shopId } = useParams();
  const { shop } = useGetShop(shopId);

  useEffect(() => {
    setSearchString(searchQuery ?? "");
  }, [searchQuery]);

  useEffect(() => {
    if (shop) setSearchLocation("shop");
  }, [shop]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchString !== "") {
      setSearchString("");
      navigate({
        pathname: searchLocation === "shop" ? `/shop/${shopId}` : "/",
        search: `?search=${encodeURIComponent(searchString)}`,
      });
    }
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newSearchString = e.target.value;
    if (
      newSearchString.match(/^[a-zA-Z0-9_\-., ]+$/) &&
      newSearchString.length <= 50
    )
      setSearchString(newSearchString);
  }
  return (
    <form onSubmit={handleSearch}>
      {shop && (
        <select
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        >
          <option value="shop">In {shop.name}</option>
          <option value="all">Everywhere</option>
        </select>
      )}
      <input
        type="text"
        value={searchString}
        onChange={handleChange}
        max={50}
      />
    </form>
  );
}

export default SearchBar;
