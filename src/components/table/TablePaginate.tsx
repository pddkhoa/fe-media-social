import { cn } from "@/utils/class-name";
import { PiCaretDownBold } from "react-icons/pi";
import { Select } from "rizzui";
import Pagination, { PaginationProps } from "../ui/Pagination";

const paginationLimitOptions: any = [3, 5, 10].map((v, idx) => ({
  id: idx,
  name: String(v),
  value: v,
}));

export type TablePaginationProps = {
  pageSize: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  paginatorClassName?: string;
} & PaginationProps;

export default function TablePagination({
  pageSize,
  setPageSize,
  total,
  paginatorClassName = "mt-5 xs:mt-6 sm:mt-7",
  ...props
}: TablePaginationProps) {
  if (total && total < pageSize) {
    return null;
  }

  return (
    <div
      className={cn(
        "table-pagination flex items-center justify-center sm:justify-between",
        paginatorClassName
      )}
    >
      <div className="flex justify-center items-center gap-5">
        {total && (
          <div className="hidden text-gray-500 sm:inline-flex">
            {props.current} of {Math.ceil(total / pageSize)} pages
          </div>
        )}

        <div className="hidden items-center sm:flex">
          <div className="w-56">Rows per page: </div>
          <Select
            options={paginationLimitOptions}
            onChange={setPageSize}
            size="sm"
            variant="flat"
            value={pageSize}
            getOptionValue={({ value }) => value}
            suffix={<PiCaretDownBold />}
            dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
            className="ms-1 [&_button]:font-medium"
          />
        </div>
      </div>

      <Pagination
        total={total}
        pageSize={pageSize}
        defaultCurrent={1}
        showLessItems={true}
        prevIconClassName="py-0 text-gray-500 !leading-[26px]"
        nextIconClassName="py-0 text-gray-500 !leading-[26px]"
        {...props}
      />
    </div>
  );
}
