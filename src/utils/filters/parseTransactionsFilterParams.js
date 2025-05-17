import { categoriesList, typeList } from '../../constants/transactions.js';

export const parseTransactionsFilterParams = ({
  minTransactionDate,
  maxTransactionDate,
  type,
  category,
}) => {
  const parsedMinTransactionDate = minTransactionDate ? new Date(minTransactionDate) : undefined;
  let parsedMaxTransactionDate = maxTransactionDate ? new Date(maxTransactionDate) : undefined;

  if (parsedMaxTransactionDate) {
   
    const year = parsedMaxTransactionDate.getFullYear();
    const month = parsedMaxTransactionDate.getMonth();
    parsedMaxTransactionDate = new Date(year, month + 1, 0, 23, 59, 59, 999);
  }

  const parsedType = typeList.includes(type) ? type : undefined;
  const parsedCategory = categoriesList.includes(category) ? category : undefined;

  return {
    minTransactionDate: parsedMinTransactionDate,
    maxTransactionDate: parsedMaxTransactionDate,
    type: parsedType,
    category: parsedCategory,
  };
};
