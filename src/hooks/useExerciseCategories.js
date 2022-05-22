import { useEffect, useState } from "react";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data: res } = await api.get(API_URLS.exercise.categories);
      setCategories(res);
    } catch (ex) {
      console.error("Error in fetching categories", ex.message);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return categories;
};

export default useCategories;
