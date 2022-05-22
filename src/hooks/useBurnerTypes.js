import { useEffect, useState } from "react";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";

const useBurnerTypes = () => {
  const [burnerTypes, setBurnerTypes] = useState([]);

  const fetchBurnerTypes = async () => {
    try {
      const { data: res } = await api.get(API_URLS.burner.types);
      setBurnerTypes(res);
    } catch (ex) {
      console.error("Error in fetching burner types", ex.message);
    }
  };
  useEffect(() => {
    fetchBurnerTypes();
  }, []);

  return burnerTypes;
};

export default useBurnerTypes;
