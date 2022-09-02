import { Button } from "./Button";

const errorStyle = "";
export const Error = () => (
  <div className={errorStyle}>There is an error</div>
);

const loadingStyle = "";
export const Loading = ({ label }) => (
  <div className={loadingStyle}>{`Loading ${label}...`}</div>
);

const formStyle = "container pt-4 max-w-prose mx-auto flex flex-col";
export const Form = ({ label, handleSubmit, children }) => {
  return (
    <form className={formStyle} onSubmit={handleSubmit}>
      {children}
      <Button text={label} />
    </form>
  );
};
