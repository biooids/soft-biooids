import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about/About";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import Search from "./pages/Search";
import Privacy from "./pages/Privacy";
import TermsAndCond from "./pages/TermsAndCond";
import Landing from "./pages/Landing";
import Sell from "./pages/Sell";
import ScrollToTop from "./pages/ScrollToTop";
import MainLayoute from "./pages/MainLayoute";
import NotFound from "./components/NotFound";
import HomeLayoute from "./pages/HomeLayoute";
import Articles from "./pages/articles/Articles";
import AllArticles from "./pages/articles/AllArticles";
import CreateArticle from "./pages/articles/CreateArticle";
import ArticlePage from "./pages/articles/ArticlePage";
import MyArticles from "./pages/articles/myArticles/MyArticles";
import Researches from "./pages/research/Researches";

import CreateResearch from "./pages/research/CreateResearch";
import ResearchPage from "./pages/research/ResearchPage";
import AllResearch from "./pages/research/AllResearch";
import UpdateArticle from "./pages/articles/myArticles/UpdateArticle";
import UpdateResearch from "./pages/research/myResearches/UpdateResearch";
import MyResearches from "./pages/research/myResearches/MyResearches";
import Updates from "./pages/Updates/Updates";
import AllUpdates from "./pages/Updates/AllUpdates";
import CreateUpdate from "./pages/Updates/CreateUpdate";
import UpdatePage from "./pages/Updates/UpdatePage";
import MyUpdates from "./pages/Updates/myUpdates/MyUpdates";
import UpdateUpdate from "./pages/Updates/myUpdates/UpdateUpdate";
import Collections from "./pages/collections/Collections";
import Ads from "./pages/ads/Ads";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<MainLayoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsAndCond />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/post/:postSlug" element={<PostPage />} />

          <Route element={<HomeLayoute />}>
            <Route path="/articles" element={<Articles />}>
              <Route index element={<AllArticles />} />
              <Route element={<PrivateRoute />}>
                <Route path="create-article" element={<CreateArticle />} />
                <Route
                  path="update-article/:articleId"
                  element={<UpdateArticle />}
                />
              </Route>
              <Route path="article/:articleSlug" element={<ArticlePage />} />
              <Route path="my-articles" element={<MyArticles />} />
            </Route>

            {/* collections collections collections 👇 collections collections*/}
            {/* collections collections collections collections collections*/}
            <Route path="/collections" element={<Collections />} />

            <Route path="/researches" element={<Researches />}>
              <Route index element={<AllResearch />} />
              <Route element={<PrivateRoute />}>
                <Route path="create-research" element={<CreateResearch />} />
                <Route
                  path="update-research/:researchId"
                  element={<UpdateResearch />}
                />
              </Route>
              <Route path="research/:researchSlug" element={<ResearchPage />} />
              <Route path="my-researches" element={<MyResearches />} />
            </Route>

            <Route path="/updates" element={<Updates />}>
              <Route index element={<AllUpdates />} />
              <Route element={<OnlyAdminPrivateRoute />}>
                <Route path="create-update" element={<CreateUpdate />} />
                <Route
                  path="update-update/:updateId"
                  element={<UpdateUpdate />}
                />
              </Route>
              <Route path="update/:updateSlug" element={<UpdatePage />} />
              <Route path="my-updates" element={<MyUpdates />} />
            </Route>
            <Route path="/ads" element={<Ads />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
