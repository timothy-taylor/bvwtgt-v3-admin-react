import { Layout } from "./Layout.jsx";

const errorStyle = "";
export const Error = () => (
  <Layout nav={true}>
    <div className={errorStyle}>There is an error</div>
  </Layout>
);

const loadingStyle = "";
export const Loading = ({ label }) => (
  <Layout nav={false}>
    <div className={loadingStyle}>{`Loading ${label}...`}</div>
  </Layout>
);