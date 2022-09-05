import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { GetPosts } from "./pages/GetPosts";
import { EditPost } from "./pages/EditPost";
import { CreatePost } from "./pages/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<EditPost />} />
        <Route path="/posts" element={<GetPosts />} />
        <Route path="/newPost" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
