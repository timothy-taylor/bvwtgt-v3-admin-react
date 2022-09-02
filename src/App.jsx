import { useUserAuth } from "./hooks/useUserAuth.js";
import { LogIn } from "./components/LogIn.jsx";
import { CreatePost } from "./components/CreatePost.jsx";
import { Loading, Error } from "./components/Form.jsx";

function App() {
  const { user, loading, error } = useUserAuth();

  return (
    <main className="min-w-screen min-h-screen px-6 py-3 dark:bg-amber-200">
      {error && <Error error={error} />}
      {loading && <Loading label="user" />}
      {!loading && user?.role !== "authenticated" ? <LogIn /> : <CreatePost />}
    </main>
  );
}

export default App;
