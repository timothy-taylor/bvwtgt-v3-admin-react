const buttonStyle =
  "w-1/3 p-4 border rounded border-black hover:bg-black hover:text-white";

export const Button = ({ text }) => (
  <button className={buttonStyle} type="submit">
    {text}
  </button>
);
