import PageHeader from "@/components/breadcrumb/PageHeader";
import TableListTag from "@/components/module/tags/TableTag";
import { useModal } from "@/hooks/useModal";
import ClientServices from "@/services/client";
import { Tag } from "@/type/tag";
import { useEffect, useState } from "react";
import { PiSelectionPlusFill } from "react-icons/pi";
import { Button, Empty, Loader } from "rizzui";
import ModalAddNewTags from "./ModalAddNewTags";

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
  const { openModal } = useModal();

  useEffect(() => {
    const fetchTag = async () => {
      try {
        setIsLoading(true);
        const { body } = await ClientServices.getAllTags();
        if (body?.success) {
          setDataTag(body?.result);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchTag();
  }, []);

  return (
    <div>
      <PageHeader breadcrumb={pageHeader.breadcrumb} title={pageHeader.title}>
        <Button
          onClick={() => {
            openModal({ view: <ModalAddNewTags /> });
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
          className="overflow-hidden overflow-x-hidden"
        />
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default PageTags;
