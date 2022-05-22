import { useEffect, useState } from "react";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";

const useCousines = () => {
  const [cousines, setCousines] = useState([]);

  const fetchCousines = async () => {
    try {
      const { data: res } = await api.get(API_URLS.cuisine.list);
      setCousines(res);
    } catch (ex) {
      console.error("Error in fetching cuisines", ex.message);
    }
  };
  useEffect(() => {
    fetchCousines();
  }, []);

  return cousines;
};

export default useCousines;
