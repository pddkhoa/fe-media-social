import PageHeader from "@/components/breadcrumb/PageHeader";
import TableListTag from "@/components/module/tags/TableTag";
import { useModal } from "@/hooks/useModal";
import { Tag } from "@/type/tag";
import { useCallback, useEffect, useState } from "react";
import { PiSelectionPlusFill } from "react-icons/pi";
import { Button, Empty, Loader } from "rizzui";
import ModalAddNewTags from "../../../components/module/tags/ModalAddNewTags";
import TagServices from "@/services/tag";
import useAuth from "@/hooks/useAuth";

const pageHeader = {
    title: "Tags",
    breadcrumb: [
        {
            href: "/",
            name: "Home",
        },
        {
            href: "/tags",
            name: "All Tags",
        },
    ],
};

const PageTags = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataTag, setDataTag] = useState<Tag[]>([]);
    const [isAdd, setIsAdd] = useState(false);
    const { openModal } = useModal();
    const [isDelete, setIsDelete] = useState(false);
    const { axiosJWT } = useAuth();

    const fetchTag = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await TagServices.getAllTags(axiosJWT);
            if (body?.success) {
                setDataTag(body?.result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setDataTag]);

    useEffect(() => {
        fetchTag();
    }, [fetchTag, isAdd, isDelete]);

    return (
        <div>
            <PageHeader
                breadcrumb={pageHeader.breadcrumb}
                title={pageHeader.title}
            >
                <Button
                    onClick={() => {
                        openModal({
                            view: <ModalAddNewTags setIsAdd={setIsAdd} />,
                        });
                    }}
                    variant="outline"
                    size="sm"
                    className="flex gap-3"
                >
                    Add New Tags <PiSelectionPlusFill className="h-4 w-4" />
                </Button>
            </PageHeader>

            {isLoading ? (
                <Loader />
            ) : dataTag && dataTag.length > 0 ? (
                <TableListTag
                    data={dataTag}
                    setIsDelete={setIsDelete}
                    className="overflow-hidden overflow-x-hidden"
                />
            ) : (
                <Empty />
            )}
        </div>
    );
};

export default PageTags;
