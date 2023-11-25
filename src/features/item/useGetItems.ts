import { useQuery } from "react-query";
import { getItems } from "../../api/item";
import { getItemType } from "../../type/itemType";

export default function useGetItems(
  limit: number,
  page: number,
  tags: number[]
) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getItems", limit, page, tags],
    queryFn: () => getItems(limit, page, tags),
  });
  return { isLoading, error, items: data as getItemType[] | undefined };
}
