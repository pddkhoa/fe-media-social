import PageHeader from "@/components/breadcrumb/PageHeader";
import TabListSetting from "@/components/profile-setting/TabListSetting";
import { Outlet } from "react-router-dom";

const PageProfileSetting = () => {
  const pageHeader = {
    title: "Account Settings",
    breadcrumb: [
      {
        href: "/",
        name: "Home",
      },
      {
        href: "/profile-setting",
        name: "Account Settings",
      },
    ],
  };
  return (
    <>
      <PageHeader breadcrumb={pageHeader.breadcrumb} title={pageHeader.title} />
      <TabListSetting />
      <Outlet />
    </>
  );
};

export default PageProfileSetting;
