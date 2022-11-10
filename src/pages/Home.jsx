import { Navigate } from "react-router-dom";
import { useGetSupabase } from "../hooks/useGetSupabase.js";
import { LogIn } from "./LogIn.jsx";
import { queries }from "../lib/queries.js"
import { Error, Loading } from "../components/LoadingError.jsx";

export const Home = () => {
  const { data, loading, error } = useGetSupabase(() => queries.getUser());

  if (loading) return <Loading label="user" />
  if (error) return <Error />
  if (data?.user?.role === "authenticated") return <Navigate to="/newPost" replace={true} />
  return <LogIn />
}