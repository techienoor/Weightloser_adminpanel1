import styles from "./GroceryItem.module.scss";
import Plus from "icons/Plus";
import Typography from "components/Typography";
import Input from "components/Input";

const GroceryItem = ({
  title,
  items = [""],
  onAddItem = () => {},
  groceryIndex,
  setFieldValue,
  previewMode,
}) => {
  const handleChange = (e, index) => {
    e.preventDefault();
    setFieldValue(`Grocery[${groceryIndex}].items[${index}]`, e.target.value);
  };

  return (
    <div className={styles.base}>
      <Typography variant="body_bold" className={styles.title}>
        {title}
      </Typography>
      {items.map((m, i) => (
        <Input
          previewMode={previewMode}
          key={i.toString()}
          className={styles.input}
          onChange={(e) => handleChange(e, i)}
          value={m}
          placeholder="No"
        />
      ))}
      {!previewMode && <Plus clickable onClick={onAddItem} />}
    </div>
  );
};

export default GroceryItem;
