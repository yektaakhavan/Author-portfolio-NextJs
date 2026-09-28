import { useEffect, useState } from "react";
import { api } from "../lib/api";

/** Full article list from the backend, freshest first. */
export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api
      .getArticles()
      .then((data) => !cancelled && setArticles(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return { articles, loading, error };
}

/** A single article by id, plus up to 5 other articles for the sidebar. */
export function useArticle(id) {
  const [article, setArticle] = useState(null);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([api.getArticle(id), api.getArticles()])
      .then(([current, all]) => {
        if (cancelled) return;
        setArticle(current);
        setOthers(all.filter((a) => String(a.id) !== String(id)).slice(0, 5));
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { article, others, loading, error };
}
