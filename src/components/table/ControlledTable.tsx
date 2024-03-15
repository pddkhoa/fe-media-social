import { Title } from "rizzui";
import Table, { TableProps } from "../ui/Table";
import { cn } from "@/utils/class-name";
import Spinner from "../ui/Spinner";
import TablePagination, { TablePaginationProps } from "./TablePaginate";
import isEmpty from "lodash/isEmpty";

type ControlledTableProps = {
  isLoading?: boolean;
  showLoadingText?: boolean;
  filterElement?: React.ReactElement;
  // filterOptions?: TableFilterProps;
  paginatorOptions?: TablePaginationProps;
  className?: string;
  paginatorClassName?: string;
} & TableProps;

export default function ControlledTable({
  isLoading,
  // filterElement,
  // filterOptions,
  paginatorOptions,
  showLoadingText,
  paginatorClassName,
  className,
  ...tableProps
}: ControlledTableProps) {
  if (isLoading) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />
        {showLoadingText ? (
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        ) : null}
      </div>
    );
  }

  return (
    <>
      {/* {!isEmpty(filterOptions) && (
                <TableFilter {...filterOptions}>{filterElement}</TableFilter>
            )} */}

      <div className="relative">
        <Table
          scroll={{ x: 1300 }}
          rowKey={(record) => record.id}
          className={cn(className)}
          {...tableProps}
        />
      </div>

      {!isEmpty(paginatorOptions) && (
        <TablePagination
          paginatorClassName={paginatorClassName}
          {...paginatorOptions}
        />
      )}
    </>
  );
}
