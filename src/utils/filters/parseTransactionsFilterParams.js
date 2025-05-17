import { categoriesList, typeList } from '../../constants/transactions.js';

const parseNumber = (value) => {
  if (typeof value !== 'string') return;
  const parseNumber = parseInt(value);
  if (Number.isNaN(parseNumber)) return;
  return parseNumber;
};

export const parseTransactionsFilterParams = ({
  minTrabsactionDate,
  maxTrabsactionDate,
  type,
  category,
}) => {
  const parseMinTrabsactionDate = parseNumber(minTrabsactionDate);
  const parseMaxTrabsactionDate = parseNumber(maxTrabsactionDate);

  const parsedType = typeList.includes(type) ? type : undefined;
  const parsedCategory = categoriesList.includes(category)
    ? category
    : undefined;

  return {
    parseMinTrabsactionDate,
    parseMaxTrabsactionDate,
    type: parsedType,
    category: parsedCategory,
  };
};
