import { useState, useMemo } from "react";

function useTable(dataTable: any[], defaultSortField = "") {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: defaultSortField,
    direction: "ascending",
  });

  const sortedData = useMemo(() => {
    const sortableItems = [...dataTable];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [dataTable, sortConfig]);

  const searchedData = useMemo(() => {
    if (!searchTerm) return sortedData;

    const searchTermLower = searchTerm.toLowerCase();

    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        typeof value === "object"
          ? value &&
            Object.values(value).some(
              (nestedItem) =>
                nestedItem &&
                String(nestedItem).toLowerCase().includes(searchTermLower)
            )
          : value && String(value).toLowerCase().includes(searchTermLower)
      )
    );
  }, [sortedData, searchTerm]);

  const requestSort = (key: any) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const handleRowSelect = (recordKey: string) => {
    const selectedKeys = [...selectedRowKeys];
    if (selectedKeys.includes(recordKey)) {
      setSelectedRowKeys(selectedKeys.filter((key) => key !== recordKey));
    } else {
      setSelectedRowKeys([...selectedKeys, recordKey]);
    }
  };
  const handleSelectAll = () => {
    if (selectedRowKeys.length === dataTable.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(dataTable.map((record) => record.id));
    }
  };

  return {
    dataTable: searchedData,
    requestSort,
    setSearchTerm,
    sortConfig,
    searchTerm,
    handleRowSelect,
    handleSelectAll,
    selectedRowKeys,
  };
}

export default useTable;
