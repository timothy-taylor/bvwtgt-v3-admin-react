import { Link } from "react-router-dom";
import { useGetSupabase } from "../hooks/useGetSupabase";
import { Layout } from "../components/Layout";
import { queries } from "../lib/queries.js";
import { Error, Loading } from "../components/LoadingError.jsx";

export const Plans = () => {
  const { data: plans, loading, error } = useGetSupabase(() => queries.read("plans"));

  if (loading) return <Loading label="plans" />
  if (error) return <Error />
  return (
    <Layout nav={true}>
      {plans.map((plan, i) => (
        <Link className="block hover:underline" key={`${i}${plan.title}`} to={`/plans/${plan.id}`}>
          {plan.arrive_date}: {plan.title}
        </Link>
      ))}
    </Layout>
  );
};