import { useState } from "react";
import { Form } from "../components/Form.jsx";
import { Layout } from "../components/Layout";
import { queries } from "../lib/queries.js";


export const LogIn = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await queries.signIn(email);
  };

  return (
    <Layout nav={false}>
      <Form label="Log in" handleSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form>
    </Layout>

  );
};
