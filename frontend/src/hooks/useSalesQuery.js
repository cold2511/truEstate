import { useEffect, useState } from "react";
import { fetchSales } from "../services/api";

export const useSalesQuery = (query) => {
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchSales(query);
        if (!ignore) {
          setData(res.data);
          setPageInfo({
            page: res.page,
            totalPages: res.totalPages,
            totalItems: res.totalItems
          });
        }
      } catch (err) {
        if (!ignore) {
          setError("Failed to load sales");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [JSON.stringify(query)]); // shallow-deps hack

  return { data, pageInfo, loading, error };
};
