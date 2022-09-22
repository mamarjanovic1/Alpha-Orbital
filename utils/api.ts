import axios from "axios";

export const fetchBlogPosts = async () => {
  return await axios.get("https://www.alpha-orbital.com/last-100-news.json/");
};
