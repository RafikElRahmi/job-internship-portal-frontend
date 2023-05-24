import React, { useEffect} from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "../pages/home/NavBar";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import { Auth } from "../components/auth/Auth";
import Home from "../components/Home/Home";
import LoginForm from "../pages/login/login";
import RegisterForm from "../pages/login/Register";
import LoginAlert from "../pages/home/LoginAlert";
import HomeAdmin from "../pages/admin/HomeAdmin";
import ProfilePage from "../pages/home/Profile";
import AuthAdmin from "../components/auth/AuthAdmin";
import AuthSociety from "../components/auth/AuthSociety";
import AuthUser from "../components/auth/AuthUser";
import RequiredAuth from "../components/auth/RequiredAuth";
import HomeUser from "../pages/user/HomeUser";
import HomeSociety from "../pages/society/HomeSociety";
import AddPost from "../pages/society/AddPost";
import Footer from "../pages/home/Footer";
import PostulationSociety from "../pages/user/PostulationSociety";
import MyPosts from "../pages/society/MyPosts";
import About from "../pages/about/About";
import Postsuser from "../pages/user/Postsuser";
import PostulationForm from "../pages/user/PostulationForm";
import PostulationsList from "../pages/user/PostulationsList";
import PostulationStatus from "../pages/user/PostulationStatus";
import ProfileFromPosts from "../pages/user/ProfileFromPosts";
import UserNotfound from "../pages/user/UserNotFound";
import Postulation from "../pages/user/Postulation";
import ListPostulations from "../pages/society/ListPostulaions";
import ModifyPost from "../pages/society/ModifiePost";
import PostsSociety from "../pages/society/PostsSociety";
import EditPostulation from "../pages/society/EditPostulation";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminSocieties from "../pages/admin/AdminSocieties";
import AdminPostulations from "../pages/admin/AdminPostulations";
import AdminPosts from "../pages/admin/AdminPosts";
import UserProfile from "../pages/admin/UserProfile";
import AuthSuperAdmin from "../components/auth/AuthSuperAdmin";
import Admins from "../pages/admin/Admins";

const Routerdom = () => {
  const location = useLocation();
  useEffect(() => {
    let title = "FS FAST";

    switch (location.pathname) {
      case "/":
        title = "FS FAST | Home";
        break;
      case "/1KQ4vU4E9Fadmin":
        title = "FS FAST | Admin Home";
        break;
      case "/1KQ4vU4E9Fadmin/profile":
        title = "FS FAST | Admin Profile";
        break;
      case "/1KQ4vU4E9Fadmin/users":
        title = "FS FAST | Admin Users";
        break;
      case "/1KQ4vU4E9Fadmin/postulations":
        title = "FS FAST | Admin Postulations";
        break;
      case "/1KQ4vU4E9Fadmin/admins":
        title = "FS FAST | Super Admins";
        break;
      case "/1KQ4vU4E9Fadmin/users/profile":
        title = "FS FAST | User Profile (Admin)";
        break;
      case "/1KQ4vU4E9Fadmin/societies":
        title = "FS FAST | Admin Societies";
        break;
      case "/1KQ4vU4E9Fadmin/societies/profile":
        title = "FS FAST | Society Profile (Admin)";
        break;
      case "/1KQ4vU4E9Fadmin/posts":
        title = "FS FAST | Admin Posts";
        break;
      case "/user":
        title = "FS FAST | User Home";
        break;
      case "/1KQ4vU4E9Fadmin/profile/:email":
        title = "FS FAST | Profile from Posts (Admin)";
        break;
      case "/user/profile":
        title = "FS FAST | User Profile";
        break;
      case "/user/postulate":
        title = "FS FAST | User Postulate";
        break;
      case "/user/upgrade":
        title = "FS FAST | User Upgrade";
        break;
      case "/user/postulations":
        title = "FS FAST | User Postulations";
        break;
      case "/user/postulationupgrade":
        title = "FS FAST | User Postulation Upgrade";
        break;
      case "/user/posts":
        title = "FS FAST | User Posts";
        break;
      case "/user/posts/usernotfound":
        title = "FS FAST | User Posts - User Not Found";
        break;
      case "/user/profile/:email":
        title = "FS FAST | Profile from Posts (User)";
        break;
      case "/society/profile/:email":
        title = "FS FAST | Profile from Posts (Society)";
        break;
      case "/user/postulation":
        title = "FS FAST | User Postulation";
        break;
      case "/society":
        title = "FS FAST | Society Home";
        break;
      case "/society/addpost":
        title = "FS FAST | Society Add Post";
        break;
      case "/society/myposts":
        title = "FS FAST | Society My Posts";
        break;
      case "/society/myposts/modify":
        title = "FS FAST | Society Modify Post";
        break;
      case "/society/posts":
        title = "FS FAST | Society Posts";
        break;
      case "/society/postulations":
        title = "FS FAST | Society Postulations";
        break;
      case "/society/postulation":
        title = "FS FAST | Society Edit Postulation";
        break;
      case "/society/profile":
        title = "FS FAST | Society Profile";
        break;
      case "/alert":
        title = "FS FAST | Login Alert";
        break;
      case "/login":
        title = "FS FAST | Login";
        break;
      case "/register":
        title = "FS FAST | Register";
        break;
      case "/about":
        title = "FS FAST | About";
        break;
      default:
        title = "FS FAST | Page Not Found";
        break;
    }

    document.title = title;
  }, [location]);
  return (
    <Auth>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <RequiredAuth>
              <Home />
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="/1KQ4vU4E9Fadmin"
          element={
            <AuthAdmin>
              <HomeAdmin />
            </AuthAdmin>
          }
        ></Route>
        <Route
          path="/1KQ4vU4E9Fadmin/profile"
          element={
            <AuthAdmin>
              <ProfilePage />
            </AuthAdmin>
          }
        ></Route>
        <Route
          path="/1KQ4vU4E9Fadmin/users"
          element={
            <AuthAdmin>
              <AdminUsers />
            </AuthAdmin>
          }
        ></Route>
        <Route
          path="/1KQ4vU4E9Fadmin/postulations"
          element={
            <AuthAdmin>
              <AdminPostulations />
            </AuthAdmin>
          }
        ></Route>
        <Route
          path="/1KQ4vU4E9Fadmin/admins"
          element={
            <AuthSuperAdmin>
              <Admins />
            </AuthSuperAdmin>
          }
        ></Route>
        <Route
          path="/1KQ4vU4E9Fadmin/users/profile"
          element={
            <AuthAdmin>
              <UserProfile />
            </AuthAdmin>
          }
        ></Route>
        <Route
          path="/1KQ4vU4E9Fadmin/societies"
          element={
            <AuthAdmin>
              <AdminSocieties />
            </AuthAdmin>
          }
        ></Route>
        <Route
          path="/1KQ4vU4E9Fadmin/societies/profile"
          element={
            <AuthAdmin>
              <UserProfile />
            </AuthAdmin>
          }
        ></Route>
        <Route
          path="/1KQ4vU4E9Fadmin/postulations"
          element={
            <AuthAdmin>
              <AdminPostulations />
            </AuthAdmin>
          }
        ></Route>
        <Route
          path="/1KQ4vU4E9Fadmin/posts"
          element={
            <AuthAdmin>
              <AdminPosts />
            </AuthAdmin>
          }
        ></Route>
        <Route
          path="/user"
          element={
            <AuthUser>
              <HomeUser />
            </AuthUser>
          }
        ></Route>
        <Route
          path="/1KQ4vU4E9Fadmin/profile/:email"
          element={
            <AuthAdmin>
              <ProfileFromPosts />
            </AuthAdmin>
          }
        ></Route>
        <Route
          path="/user/profile"
          element={
            <AuthUser>
              <ProfilePage />
            </AuthUser>
          }
        ></Route>
        <Route
          path="/user/postulate"
          element={
            <AuthUser>
              <PostulationForm />
            </AuthUser>
          }
        ></Route>
        <Route
          path="/user/upgrade"
          element={
            <AuthUser>
              <PostulationSociety />
            </AuthUser>
          }
        ></Route>
        <Route
          path="/user/postulations"
          element={
            <AuthUser>
              <PostulationsList />
            </AuthUser>
          }
        ></Route>
        <Route
          path="/user/postulationupgrade"
          element={
            <AuthUser>
              <PostulationStatus />
            </AuthUser>
          }
        ></Route>
        <Route
          path="/user/posts"
          element={
            <AuthUser>
              <Postsuser />
            </AuthUser>
          }
        ></Route>
        <Route
          path="/user/posts/usernotfound"
          element={
            <AuthUser>
              <UserNotfound />
            </AuthUser>
          }
        ></Route>
        <Route
          path="/user/profile/:email"
          element={
            <AuthUser>
              <ProfileFromPosts />
            </AuthUser>
          }
        ></Route>
        <Route
          path="/society/profile/:email"
          element={
            <AuthSociety>
              <ProfileFromPosts />
            </AuthSociety>
          }
        ></Route>
        <Route
          path="/user/postulation"
          element={
            <AuthUser>
              <Postulation />
            </AuthUser>
          }
        ></Route>
        <Route
          path="/society"
          element={
            <AuthSociety>
              <HomeSociety />
            </AuthSociety>
          }
        ></Route>
        <Route
          path="/society/addpost"
          element={
            <AuthSociety>
              <AddPost />
            </AuthSociety>
          }
        ></Route>
        <Route
          path="/society/myposts"
          element={
            <AuthSociety>
              <MyPosts />
            </AuthSociety>
          }
        ></Route>
        <Route
          path="/society/myposts/modify"
          element={
            <AuthSociety>
              <ModifyPost />
            </AuthSociety>
          }
        ></Route>
        <Route
          path="/society/posts"
          element={
            <AuthSociety>
              <PostsSociety />
            </AuthSociety>
          }
        ></Route>
        <Route
          path="/society/postulations"
          element={
            <AuthSociety>
              <ListPostulations />
            </AuthSociety>
          }
        ></Route>
        <Route
          path="/society/postulation"
          element={
            <AuthSociety>
              <EditPostulation />
            </AuthSociety>
          }
        ></Route>
        <Route
          path="/society/profile"
          element={
            <AuthSociety>
              <ProfilePage />
            </AuthSociety>
          }
        ></Route>
        <Route path="/alert" element={<LoginAlert />}></Route>
        <Route
          path="login"
          element={
            <RequiredAuth>
              <LoginForm />
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="register"
          element={
            <RequiredAuth>
              <RegisterForm />
            </RequiredAuth>
          }
        ></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
    </Auth>
  );
};

export default Routerdom;
