export const toUserFriendlyText = (value) => {
  let val = value;
  if (
    val &&
    typeof val === "string" &&
    val.startsWith("[") &&
    val.endsWith("]")
  ) {
    val = val.replace("[", "");
    val = val.replace("]", ", ");
    val = val.slice(0, val.length - 2);
  }
  return val;
};

export const toForcedArray = (value) => {
  let val = toUserFriendlyText(value);
  if (val) {
    val = val.split(", ");
  }
  return val;
};
