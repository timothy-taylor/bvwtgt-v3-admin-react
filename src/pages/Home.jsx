import { Navigate } from "react-router-dom";
import { useGetSupabase } from "../hooks/useGetSupabase.js";
import { LogIn } from "./LogIn.jsx";
import api from "../api/"
import { Error, Loading } from "../components/LoadingError.jsx";

export const Home = () => {
  const { data, loading, error } = useGetSupabase(api.getUser);

  if (loading) return <Loading label="user" />
  if (error) return <Error error={error} />
  if (data?.user?.role === "authenticated") return <Navigate to="/newPost" replace={true} />
  return <LogIn />
}