import PageHeader from "@/components/breadcrumb/PageHeader";
import FormCreateGroup from "@/components/module/group/FormCreateGroup";

const pageHeader = {
  title: "Groups",
  breadcrumb: [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/group",
      name: "Groups",
    },
    {
      href: "/group/create",
      name: "Create Group",
    },
  ],
};

const PageCreateGroup = () => {
  return (
    <>
      <PageHeader breadcrumb={pageHeader.breadcrumb} title={pageHeader.title} />
      <FormCreateGroup />
    </>
  );
};

export default PageCreateGroup;
