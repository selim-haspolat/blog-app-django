import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";
import PrivateRouter from "./PrivateRouter";
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import MyBlogs from "../pages/MyBlogs";
import PrivateNavbar from "./PrivateNavbar";
import Details from "../pages/Details";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="" element={<PrivateNavbar/>}>
          <Route path="/new-blog" element={<NewBlog />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
