import Search from "icons/Search";
import styles from "./Search.module.scss";
import classNames from "classnames";

const SearchInput = ({ className, ...rest }) => {
  return (
    <div className={classNames(className, styles.search_container)}>
      <Search className={styles.icon} />
      <input {...rest} placeholder="Search..." />
    </div>
  );
};

export default SearchInput;
