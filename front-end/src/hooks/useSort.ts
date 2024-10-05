import { useState } from "react";
import { TransactionsConfig } from "../components/TransactionsList";
import { Transaction } from "../store/slices/transactionSlice";

const useSort = (data: Transaction[], config: TransactionsConfig[]) => {
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const setSortLable = (label: string) => {
    if (sortBy !== label) {
      setSortBy(label);
      setSortOrder("asc");
    } else if (sortOrder == "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  const sortedData = [...data];

  if (sortBy && sortOrder) {
    const sortValue = config.find(
      (configData: TransactionsConfig) => configData.label === sortBy
    )!.sortValue;
    sortedData.sort((a, b): number => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const isAsc = sortOrder === "asc" ? 1 : -1;

      if (typeof valueA === "string") {
        return isAsc * valueA.localeCompare(valueB);
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return isAsc * (valueA - valueB);
      } else {
        throw new Error("Incorrect types are compared");
      }
    });
  }

  return { setSortLable, sortedData, sortOrder, sortBy };
};

export default useSort;
