import { useSearchParams } from "react-router-dom";

function Sort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") ?? "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSortBy = e.target.value;
    if (newSortBy === "") searchParams.delete("sort");
    else searchParams.set("sort", newSortBy);
    setSearchParams(searchParams);
  }
  return (
    <select value={sortBy} onChange={handleChange}>
      <option value="">Most relevant</option>
      <option value="cheapest">Lowest price</option>
      <option value="mostExpensive">Highest price</option>
      <option value="oldest">Oldest</option>
      <option value="newest">newest</option>
    </select>
  );
}

export default Sort;
