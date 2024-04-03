import ControlledTable from "@/components/table/ControlledTable";
import { useColumn } from "@/hooks/useColumn";
import useTable from "@/hooks/useTable";
import { useMemo } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { Input } from "rizzui";
import { getColumnsTag } from "./ColumnTag";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ClientServices from "@/services/client";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/useModal";

export default function TableListTag({
    className,
    data = [],
    setIsDelete,
}: {
    className?: string;
    data: any[];
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const isAuth = useSelector(
        (state: RootState) => state.auth.userToken.user._id
    );
    const { dataTable, setSearchTerm, searchTerm } = useTable(data);
    const { openModal, closeModal } = useModal();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDelete = async (tagId: string) => {
        const { body } = await ClientServices.deleteTags(tagId);
        if (body?.success) {
            toast.success(body?.message);
            setIsDelete(true);
        } else {
            toast.error(body?.message || "Error");
        }
    };

    const columns = useMemo(
        () => getColumnsTag({ isAuth, handleDelete, openModal, closeModal }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isAuth, handleDelete, openModal, closeModal]
    );

    const { visibleColumns } = useColumn(columns);

    return (
        <>
            <div className="flex justify-start items-center">
                <Input
                    type="search"
                    placeholder={"Search in here..."}
                    value={searchTerm}
                    onClear={() => setSearchTerm("")}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    clearable
                    className="w-1/4 py-4"
                    prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
                />
            </div>
            <div className={className}>
                <ControlledTable
                    // isLoading={isLoading}
                    showLoadingText={true}
                    data={dataTable}
                    columns={visibleColumns}
                    scroll={{ x: 800 }}
                    variant="modern"
                    tableLayout="fixed"
                    rowKey={(record) => record.id}
                    // paginatorOptions={{
                    //   pageSize,
                    //   setPageSize,
                    //   total: totalData,
                    //   current: pageIndex,
                    //   onChange: (page: number) => handlePaginateIndex(page),
                    // }}
                />
            </div>
        </>
    );
}
