import { useQuery } from "react-query";
import { getItems } from "../../api/item";

export default function useGetItems({
  search,
  orderBy,
  limit,
  page,
  tags,
}: {
  search?: string | null;
  orderBy?: string | null;
  limit?: number | null;
  page?: number | null;

  tags?: number[];
}) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getItems", search, orderBy, limit, page, tags],
    queryFn: () => getItems({ search, orderBy, limit, page, tags }),
  });
  return { isLoading, error, items: data };
}
