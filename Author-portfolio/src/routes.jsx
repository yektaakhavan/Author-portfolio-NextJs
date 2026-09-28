import { lazy } from "react";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Books = lazy(() => import("./pages/Books/Books"));
const Article = lazy(() => import("./pages/Article/Article"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail/ArticleDetail"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Admin = lazy(() => import("./pages/Admin/Admin"));

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/books", element: <Books /> },
  { path: "/article", element: <Article /> },
  { path: "/article/:id", element: <ArticleDetail /> },
  { path: "/contact", element: <Contact /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/admin", element: <Admin /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
