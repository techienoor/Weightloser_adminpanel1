import React, { useState, useEffect, useMemo } from "react";
import Input from "components/Input";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import styles from "./UserSearch.module.scss";
import { debounce } from "lodash";

const UserSearch = ({ setSelectedUser, placeholder = "User name" }) => {
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [value, setValue] = useState("");

  const handleSearchUser = async (e) => {
    const { data } = await api.get(API_URLS.user.search(e.target.value));
    if (data && data.length) {
      setList(data);
      setShowList(true);
    }
  };
  const debouncedResults = useMemo(() => {
    return debounce(handleSearchUser, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  const handleKeyUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.which === 13) {
      debouncedResults(e);
    }
  };
  const handleClickItem = (id) => {
    const selectedItem = list.find((f) => f.Id === id);
    setSelectedUser(selectedItem);
    setValue(selectedItem.UserName);
    setShowList(false);
  };

  return (
    <div className={styles.base}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
      />
      {showList && (
        <div className={styles.dataList}>
          {list.map((m) => (
            <div onClick={() => handleClickItem(m.Id)} key={m.Id}>
              {m.UserName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
