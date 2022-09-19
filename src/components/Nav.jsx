import { NavLink } from "react-router-dom";

const linkStyle = "px-2 hover:underline";
const activeLinkStyle = "px-2 font-bold";
const StyledNavLink = ({ path, text }) => (
  <NavLink
    to={path}
    className={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
  >
    {text}
  </NavLink>
);

export const Nav = () => {
  return (
    <nav className="max-w-prose mx-auto text-right">
      <StyledNavLink path="/newPost" text="New post" />
      <StyledNavLink path="/posts" text="Edit post" />
      <StyledNavLink path="/newPlans" text="New plan" />
      <StyledNavLink path="/plans" text="Edit plan" />
    </nav>
  );
};
