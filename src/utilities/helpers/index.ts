export const isStringSafeAndValid = (text, excludeNumbers?, ignoreStringSafe?) => {
  if (ignoreStringSafe) return true;
  if (typeof text === "string" && text.trim()) {
    return getTextSafeRegex(excludeNumbers).test(text);
  } else {
    return false;
  }
};

const getTextSafeRegex = (excludeNumbers) => {
  return excludeNumbers ? /^[A-Za-z-'\s]+$/ : /^[A-Za-z0-9-'\s]+$/;
};
