import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState<string>("");
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchString !== "") {
      navigate({
        pathname: "/",
        search: `?search=${encodeURIComponent(searchString)}`,
      });
      setSearchString("");
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
