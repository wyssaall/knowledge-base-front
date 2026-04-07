const STORAGE_KEY = "savedArticles";

const getSavedArticles = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveArticle = (articleId) => {
  const current = getSavedArticles();
  if (!current.includes(articleId)) {
    const updated = [...current, articleId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
  return current;
};

const removeSavedArticle = (articleId) => {
  const updated = getSavedArticles().filter((id) => id !== articleId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

const isArticleSaved = (articleId) => getSavedArticles().includes(articleId);

export { getSavedArticles, saveArticle, removeSavedArticle, isArticleSaved };
