import { GoArrowDown, GoArrowUp } from "react-icons/go";
import useSort from "../hooks/useSort";
import { Transaction } from "../store/slices/transactionSlice";
import { TransactionsConfig } from "./TransactionsList";
import TransactionsTable from "./TransactionsTable";

interface SortedTransactionsTableProps {
  transactions: Transaction[];
  config: TransactionsConfig[];
  generateKey: (transaction: Transaction) => string;
}

const SortedTransactionsTable = ({
  config,
  transactions,
  generateKey,
}: SortedTransactionsTableProps) => {
  const { setSortLabel, sortedData, sortBy, sortOrder } = useSort(
    transactions,
    config
  );

  const updatedConfig: TransactionsConfig[] = config.map((configData) => {
    if (!configData.sortValue) {
      return configData;
    }

    return {
      ...configData,
      header: () => (
        <th
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => {
            setSortLabel(configData.label);
          }}
        >
          <div className="flex items-centered">
            {sortBy === configData.label ? (
              sortOrder === "asc" ? (
                <div>
                  <GoArrowUp />
                </div>
              ) : (
                <div>
                  <GoArrowDown />
                </div>
              )
            ) : (
              <div>
                <GoArrowUp />
                <GoArrowDown />
              </div>
            )}
            {configData.label}
          </div>
        </th>
      ),
    };
  });

  return (
    <TransactionsTable
      generateKey={generateKey}
      transactions={sortedData}
      config={updatedConfig}
    />
  );
};

export default SortedTransactionsTable;
