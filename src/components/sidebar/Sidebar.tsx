import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "./Items";
import Logo from "@/components/ui/Logo";
import { cn } from "@/utils/class-name";
import { PiCaretDownBold } from "react-icons/pi";
import { Collapse } from "rizzui";

export default function Sidebar({ className }: { className?: string }) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "hidden xl:block fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72",
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
            const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
              (dropdownItem) => dropdownItem.href === location.pathname
            );
            const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

            return (
              <Fragment key={item.name + "-" + index}>
                {item?.dropdownItems ? (
                  <Collapse
                    defaultOpen={isDropdownOpen}
                    header={({ open, toggle }) => (
                      <div
                        onClick={toggle}
                        className={cn(
                          "group relative mx-3 flex cursor-pointer items-center  justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2",
                          isDropdownOpen
                            ? "before:top-2/5 text-black bg-gray-200 before:absolute before:-start-3 before:block before:h-4/5 before:w-1  before:rounded-ee-md before:rounded-se-md before:bg-black 2xl:before:-start-5"
                            : "text-gray-700 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-700/90"
                        )}
                      >
                        <span className="flex items-center">
                          {item?.icon && (
                            <span
                              className={cn(
                                "me-2 inline-flex  items-center justify-center rounded-md [&>svg]:h-[26px] [&>svg]:w-[26px]",
                                isDropdownOpen
                                  ? "text-primary"
                                  : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                              )}
                            >
                              {item?.icon}
                            </span>
                          )}
                          {item.name}
                        </span>

                        <PiCaretDownBold
                          strokeWidth={3}
                          className={cn(
                            "h-3.5 w-3.5 -rotate-90  transition-transform duration-200 rtl:rotate-90",
                            open && "rotate-0 rtl:rotate-0"
                          )}
                        />
                      </div>
                    )}
                  >
                    {item?.dropdownItems?.map((dropdownItem, index) => {
                      const isChildActive =
                        location.pathname === (dropdownItem?.href as string);

                      return (
                        <Link
                          to={dropdownItem?.href}
                          key={dropdownItem?.name + index}
                          className={cn(
                            "mx-3.5 mb-0.5 flex text-sm items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5",
                            isChildActive
                              ? ""
                              : "text-gray-700 transition-colors duration-200  hover:text-gray-900 dark:text-gray-700/90"
                          )}
                        >
                          <div className="flex items-center truncate">
                            <span
                              className={cn(
                                "me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200",
                                isChildActive
                                  ? "bg-black ring-[1px] ring-black"
                                  : "opacity-40"
                              )}
                            />{" "}
                            <span className="truncate">
                              {dropdownItem?.name}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </Collapse>
                ) : (
                  <Link
                    to={item?.href}
                    className={cn(
                      "group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2",
                      isActive
                        ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                        : "text-gray-700 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-700/90"
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
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
