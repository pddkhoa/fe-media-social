import { Password, Button, Title } from "rizzui";
import ProfileHeader from "../profile/ProfileHeader";
import { cn } from "@/utils/class-name";

const TabPassword = () => {
  return (
    <>
      <ProfileHeader />

      <div className="mx-auto w-full max-w-screen-xl">
        <HorizontalFormBlockWrapper
          title="Current Password"
          titleClassName="text-base font-medium"
        >
          <Password placeholder="Enter your password" className="w-1/2" />
        </HorizontalFormBlockWrapper>

        <HorizontalFormBlockWrapper
          title="New Password"
          titleClassName="text-base font-medium"
        >
          <Password placeholder="Enter your password" className="w-1/2" />
        </HorizontalFormBlockWrapper>

        <HorizontalFormBlockWrapper
          title="Confirm New Password"
          titleClassName="text-base font-medium"
        >
          <Password placeholder="Enter your password" className="w-1/2" />
        </HorizontalFormBlockWrapper>

        <div className="mt-6 flex w-auto items-center justify-end gap-3">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="solid">
            Update Password
          </Button>
        </div>
      </div>
    </>
  );
};

export default TabPassword;

export function HorizontalFormBlockWrapper({
  title,
  titleClassName,
  description,
  children,
  className,
  descriptionClassName,
  childrenWrapperClassName,
}: React.PropsWithChildren<{
  title: React.ReactNode;
  description?: React.ReactNode;
  titleClassName?: string;
  className?: string;
  descriptionClassName?: string;
  childrenWrapperClassName?: string;
}>) {
  return (
    <div
      className={cn(
        "border-b border-dashed border-gray-300 py-10 @5xl:grid @5xl:grid-cols-6",
        className
      )}
    >
      <div className="col-span-2 mb-6 @5xl:mb-0">
        <Title
          as="h5"
          className={cn("mb-2 text-[17px] font-semibold", titleClassName)}
        >
          {title}
        </Title>
        <p
          className={cn(
            "mt-1 leading-relaxed text-gray-500",
            descriptionClassName
          )}
        >
          {description}
        </p>
      </div>
      <div
        className={cn(
          "col-span-4 grid grid-cols-1 gap-4 @lg:gap-5 @3xl:grid-cols-2",
          childrenWrapperClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
