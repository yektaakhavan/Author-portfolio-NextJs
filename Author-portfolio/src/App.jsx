import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500/20 border-t-brand-500" />
    </div>
  );
}

function App() {
  const router = useRoutes(routes);
  return <Suspense fallback={<PageLoader />}>{router}</Suspense>;
}

export default App;
