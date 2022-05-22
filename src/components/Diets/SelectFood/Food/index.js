import Typography from "components/Typography";
import styles from "./Food.module.scss";
import classNames from "classnames";
import TextArea from "components/TextArea";
import Button from "components/Button";
import Input from "components/Input";

const Food = ({
  previewMode,
  data = {},
  className,
  onChange = () => {},
  onBlur = () => {},
  errors,
  touched,
  setFieldValue = () => {},
  items = [],
}) => {
  const handleAddItem = () => {
    setFieldValue("Items", [...items, ""]);
  };
  return (
    <div className={classNames(className, styles.base)}>
      <TextArea
        previewMode={previewMode}
        placeholder="Name"
        onChange={onChange}
        onBlur={onBlur}
        error={touched["Name"] && errors["Name"]}
        name="Name"
        value={data.Name}
      />
      <div className={styles.items}>
        {items &&
          items.map((m, i) => (
            <Input
              previewMode={previewMode}
              key={i.toString()}
              placeholder="Item"
              value={m}
              onChange={(e) => {
                e.preventDefault();
                setFieldValue(`Items[${i}]`, e.target.value);
              }}
            />
          ))}
      </div>
      {!previewMode && (
        <Button type="button" size="xs" shape="rect" onClick={handleAddItem}>
          <Typography variant="small_bold">Add Item</Typography>
        </Button>
      )}
      {/* <Typography variant="body_bold" className={styles.title} block>
        {data?.Name || "N/A"}
      </Typography> */}
      {/* <Typography variant="small" className={styles.quantity} block>
        1 serving, {data?.ServingSize || 0} grams
      </Typography>
      <div>
        <span className={styles.country}>Indian</span>
        <span className={styles.type}>Vegan: Friendly</span>
      </div> */}
    </div>
  );
};

export default Food;
