import { useState } from "react";
import { supabase } from "../api/supabase-client.js";
import { Form } from "../components/Form.jsx";
import { Layout } from "../components/Layout";

export const LogIn = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user, session } = await supabase.auth.signInWithOtp({ email });
      console.log("user: ", user);
      console.log("session: ", session);
    } catch (err) {
      console.error(err);
    }
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
