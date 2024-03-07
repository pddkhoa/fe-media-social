import PageHeader from "@/components/breadcrumb/PageHeader";
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
import { cn } from "@/utils/class-name";
import { Link, useLocation } from "react-router-dom";

const settingNavItems = [
  {
    label: "My Details",
    href: "/profile-setting",
  },
  {
    label: "Password",
    href: "/profile-setting/password",
  },
];

const TabListSetting = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="sticky z-20 -mx-4 -mt-2 border-b border-gray-200 bg-white px-4 py-0 font-medium text-gray-500 sm:-mt-2 md:-mx-5 md:px-5 lg:-mx-8 lg:mt-0 lg:px-8 xl:-mx-6 xl:px-6 2xl:top-20 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10">
      <div className="relative h-[52px] flex  gap-8">
        {settingNavItems.map((menu, index) => (
          <Link
            to={`${menu.href}`}
            key={`menu-${index}`}
            className={cn(
              "group relative  cursor-pointer whitespace-nowrap py-3 font-medium text-gray-500 before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5  before:bg-gray-1000 before:transition-all hover:text-gray-900",
              menu.href === pathname
                ? "before:visible before:w-full before:opacity-100 border-b-2  border-b-black"
                : "before:invisible before:w-0 before:opacity-0"
            )}
          >
            <span className="inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200 group-hover:bg-gray-100/70">
              {menu.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PageProfileSetting;
