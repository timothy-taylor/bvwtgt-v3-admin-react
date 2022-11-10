import { useEffect, useState } from "react";

//
// query is a supabase postgres query wrapped in a function,
// ie: () => supabase.from("posts").select("*")
export const useGetSupabase = (query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await query();
        setData(response);
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading, error };
};
