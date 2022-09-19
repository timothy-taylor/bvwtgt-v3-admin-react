import { Layout } from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetSupabase } from "../hooks/useGetSupabase.js";
import { queries } from "../lib/queries.js";
import { DeleteButton, Form, Label } from "../components/Form";
import { Error, Loading } from "../components/LoadingError";
import { defaultPlan } from "../lib/data-structures.js";

export const Plan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(defaultPlan);
  const { data, loading, error } = useGetSupabase(() => queries.read("plans", id));

  const updatePlan = (cur) => setPlan((prev) => ({ ...prev, ...cur }));

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this plan?")) {
      await queries.delete("plans", id);
      navigate("/plans");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const response = queries.update("plans", id, plan);
    if (typeof response !== "undefined") alert("update successful");
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      const { location, title, description, arrive_date, leave_date } = data;
      updatePlan({ location, title, description, arrive_date, leave_date });
    }

    return () => {
      ignore = true;
    };
  }, [data, id]);

  if (loading) return <Loading label="plan" />;
  if (error) return <Error />
  return (
    <Layout nav={true}>
      <Form label="Update plan" handleSubmit={handleSubmit}>
        <Label text="location">
          <input
            type="text"
            value={plan.location}
            onChange={(e) => updatePlan({ location: e.target.value })}
          />
        </Label>
        <Label text="title">
          <input
            type="text"
            value={plan.title}
            onChange={(e) => updatePlan({ title: e.target.value })}
          />
        </Label>
        <Label text="description">
        <textarea
          className="h-32"
          value={plan.description}
          onChange={(e) => updatePlan({ description: e.target.value })}
        />
        </Label>
        <Label text="beginning">
          <input
            type="date"
            value={plan.arrive_date}
            onChange={(e) => updatePlan({ arrive_date: e.target.value })}
          />
        </Label>
        <Label text="end">
          <input
            type="date"
            value={plan.leave_date}
            onChange={(e) => updatePlan({ leave_date: e.target.value })}
          />
        </Label>
      </Form>
      <DeleteButton handeClick={handleDelete} />
    </Layout>
  )
}