import { Layout } from "../components/Layout";
import { Form, Label } from "../components/Form";
import { useState } from "react";
import { queries } from "../lib/queries.js";
import { useGetSupabase } from "../hooks/useGetSupabase.js";
import { Error, Loading } from "../components/LoadingError.jsx";
import { defaultPlan } from "../lib/data-structures.js";

export const NewPlan = () => {
  const { loading, error } = useGetSupabase(queries.getUser);
  const [plan, setPlan] = useState(defaultPlan);

  const handleChange = (newValue) => setPlan((prev) => ({ ...prev, ...newValue }));
  const handleSubmit = (e) => {
    e.preventDefault();

    const response = queries.create("plans", plan);
    if (typeof response !== "undefined") setPlan(defaultPlan);
  }

  if (loading) return <Loading label="user" />
  if (error) return <Error />
  return (
    <Layout nav={true}>
      <Form label="Add plan" handleSubmit={handleSubmit}>
        <input
          type="text"
          value={plan.location}
          placeholder="location"
          onChange={(e) => handleChange({ location: e.target.value })}
        />
        <input
          type="text"
          value={plan.title}
          placeholder="title"
          onChange={(e) => handleChange({ title: e.target.value })}
        />
        <textarea
          className="h-32"
          value={plan.description}
          placeholder="description"
          onChange={(e) => handleChange({ description: e.target.value })}
        />
        <Label text="beginning">
          <input
            type="date"
            value={plan.arrive_date}
            onChange={(e) => handleChange({ arrive_date: e.target.value })}
          />
        </Label>
        <Label text="end">
          <input
            type="date"
            value={plan.leave_date}
            onChange={(e) => handleChange({ leave_date: e.target.value })}
          />
        </Label>
      </Form>
    </Layout>
  )
}