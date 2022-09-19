import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Posts } from "./pages/Posts.jsx";
import { Post } from "./pages/Post.jsx";
import { NewPost } from "./pages/NewPost.jsx";
import { NewPlan } from "./pages/NewPlan.jsx";
import { Plans } from "./pages/Plans.jsx";
import { Plan } from "./pages/Plan.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/newPost" element={<NewPost />} />
        <Route path="/plans/:id" element={<Plan />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/newPlans" element={<NewPlan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
