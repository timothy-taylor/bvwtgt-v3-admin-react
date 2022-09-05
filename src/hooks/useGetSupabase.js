import { useEffect, useState } from "react";

//
// cb is a supabase postgres query wrapped in a function,
// ie: () => supabase.from("posts").select("*")
export const useGetSupabase = (cb) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      const { data: response } = await cb();
      setData(response);
    };

    getData()
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};