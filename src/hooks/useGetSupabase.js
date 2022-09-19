import { useEffect, useState } from "react";

//
// query is a supabase postgres query wrapped in a function,
// ie: () => supabase.from("posts").select("*")
export const useGetSupabase = (query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data: response } = await query();
      setData(response);
    };

    getData()
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
