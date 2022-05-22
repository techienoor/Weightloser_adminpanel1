import React, { useState, useEffect, useMemo } from "react";
import Input from "components/Input";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import styles from "./FoodSearch.module.scss";
import { debounce } from "lodash";
import Typography from "components/Typography";

const FoodSearch = ({ setSelectedFood }) => {
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState(false);

  const handleSearchFood = async (e) => {
    try {
      const { data } = await api.get(API_URLS.food.search(e.target.value));
      if (data && data.length) {
        setList(data);
      } else {
        setList([]);
      }
    } catch (ex) {
      console.error(ex.message);
      setList([]);
    } finally {
      setShowList(true);
    }
  };
  const debouncedResults = useMemo(() => {
    return debounce(handleSearchFood, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  const handleKeyUp = (e) => {
    e.preventDefault();
    if (e.which === 13) {
      debouncedResults(e);
    }
  };
  const handleClickItem = (id) => {
    setSelectedFood(list.find((f) => f.Id === id));
    setShowList(false);
  };

  return (
    <div className={styles.base}>
      <Input
        onChange={debouncedResults}
        onKeyUp={handleKeyUp}
        variant="outlined-rounded"
        placeholder="Search food you want to add"
      />
      {showList && (
        <div className={styles.dataList}>
          {list.map((m) => (
            <div onClick={() => handleClickItem(m.Id)} key={m.Id}>
              {m.Name}
            </div>
          ))}
          {!list.length && (
            <div className={styles.placeholder}>No records found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodSearch;
