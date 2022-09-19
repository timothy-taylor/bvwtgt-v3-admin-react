export const Label = ({ text, children }) => (
  <label className="flex flex-col">
    <span className="text-xs">{text}</span>
    {children}
  </label>
);

export const buttonStyle =
  "w-1/3 p-4 mt-2 border rounded border-black hover:bg-black hover:text-white";

export const Button = ({ text }) => (
  <button className={buttonStyle} type="submit">
    {text}
  </button>
);

export const DeleteButton = ({ handleClick }) => (
  <button className={buttonStyle} onClick={handleClick}>Delete</button>
)

export const Form = ({ label, handleSubmit, children }) => {
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      {children}
      <Button text={label} />
    </form>
  );
};
