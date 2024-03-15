import { useState, useMemo } from "react";

export function useColumn<T extends Record<string, any>>(columnsData: T[]) {
  const [checkedColumns, setCheckedColumns] = useState(
    columnsData.map((column) => column.dataIndex)
  );

  const visibleColumns: any = useMemo(
    () => filterData(columnsData, checkedColumns),
    [columnsData, checkedColumns]
  );

  return { visibleColumns, checkedColumns, setCheckedColumns };
}

export function filterData<T extends Record<string, any>>(
  array: T[],
  filterKeys: string[]
) {
  return array.filter((obj) => {
    return Object.values(obj).some((key) => filterKeys.includes(key));
  });
}
