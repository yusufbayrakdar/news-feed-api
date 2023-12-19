import {PaginationQueryDto} from "./pagination.validation";

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

export const convertQueryToQueryString = (query: PaginationQueryDto) => {
  return Object.entries(query).reduce((str, [key, value]) => {
    return str + `&${key}=${value}`;
  }, "");
};

export const getRandomCategories = (categories) => {
  if (categories.length <= 3) {
    return categories.reduce((aggStr, category) => aggStr + " " + category, "");
  } else {
    const randomIndices = [];

    while (randomIndices.length < 3) {
      const randomIndex = Math.floor(Math.random() * categories.length);

      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    return randomIndices.reduce((aggStr, index) => aggStr + " " + categories[index], "");
  }
};

export const prepareFilter = (str, seperator) => {
  const trimmed = str?.trim();
  if (!trimmed) return "";
  return trimmed.replaceAll(" ", seperator).replace(/[^a-zA-Z0-9-|\\.\s]/g, "");
};
