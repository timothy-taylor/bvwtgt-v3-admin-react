import { Nav } from "./Nav";

export const Layout = ({ nav, children }) => {
  return (
    <div className="min-w-screen min-h-screen px-6 py-3 dark:bg-amber-200">
      {nav && <Nav />}
      <main className="container pt-4 mx-auto max-w-prose">{children}</main>
    </div>
  );
};
