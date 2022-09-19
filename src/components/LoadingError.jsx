import { Layout } from "./Layout.jsx";

export const Error = () => (
  <Layout nav={true}>
    <div className="">There is an error</div>
  </Layout>
);

export const Loading = ({ label }) => (
  <Layout nav={false}>
    <div className="">{`Loading ${label}...`}</div>
  </Layout>
);