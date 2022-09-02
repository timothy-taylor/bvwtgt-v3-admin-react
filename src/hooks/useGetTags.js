import { useEffect, useState } from "react";
import { supabase } from "../api/supabase-client";

export const useGetTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const getTags = async () => {
      const { data } = await supabase.from("tags").select("*");
      setTags(data);
    };

    getTags()
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { tags, loading, error };
};
