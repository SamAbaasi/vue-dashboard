import { AxiosResponse } from "axios";
import axios from "@/lib/axios";
import { ArticleData } from "@/types/articles";
import store from "@/store";

// Create an article
export const createArticle = async (articleData: ArticleData) => {
  const response: AxiosResponse = await axios.post("/articles", {
    article: articleData,
  });
  store.dispatch("addToast", {
    message: "Article created successfuly",
    boldMessage: "Well done!",
  });
  return response.data;
};

// Edit an article
export const editArticle = async (slug: string, articleData: ArticleData) => {
  const response: AxiosResponse = await axios.put(`/articles/${slug}`, {
    article: articleData,
  });
  store.dispatch("addToast", {
    message: "Article updated successfuly",
    boldMessage: "Well done!",
  });
  return response.data;
};

// Get all articles
export const getAllArticles = async () => {
  const response: AxiosResponse = await axios.get("/articles");
  return response.data;
};

// Delete an article
export const deleteArticle = async (slug: string) => {
  const response: AxiosResponse = await axios.delete(`/articles/${slug}`);
  store.dispatch("addToast", {
    message: "Article deleted successfuly",
  });
  return response.data;
};

// Get an article
export const getArticle = async (slug: string) => {
  const response: AxiosResponse = await axios.get(`/articles/${slug}`);
  return response.data;
};
// Export the API functions
export default {
  createArticle,
  editArticle,
  getAllArticles,
  deleteArticle,
  getArticle,
};
