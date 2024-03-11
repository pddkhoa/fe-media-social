import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "./Items";
import Logo from "@/components/ui/Logo";
import { cn } from "@/utils/class-name";

export default function Sidebar({ className }: { className?: string }) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "hidden lg:block fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72",
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
        <Logo className="max-w-[155px]" />
      </div>

      <div className="h-[calc(100%-80px)]">
        <div className="mt-4 pb-3 3xl:mt-6">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === (item?.href as string);

            return (
              <Fragment key={item.name + "-" + index}>
                <Link
                  to={item?.href}
                  className={cn(
                    "group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2",
                    isActive
                      ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                      : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90"
                  )}
                >
                  {item?.icon && (
                    <span
                      className={cn(
                        "me-2 inline-flex  items-center justify-center rounded-md [&>svg]:h-[26px] [&>svg]:w-[26px]",
                        isActive
                          ? "text-primary"
                          : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                      )}
                    >
                      {item?.icon}
                    </span>
                  )}
                  {item.name}
                </Link>
              </Fragment>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
