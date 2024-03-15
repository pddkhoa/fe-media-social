import FormSignUp from "@/components/form/FormSignUp";
import { cn } from "@/utils/class-name";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Title, Button } from "rizzui";

const PageSignUp = () => {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col justify-between py-12">
        <div className="flex w-full flex-col justify-center px-5">
          <div
            className={cn(
              "mx-auto w-full max-w-md py-12 md:max-w-lg lg:max-w-xl 2xl:pb-8 2xl:pt-2"
            )}
          >
            <div className="flex flex-col items-center">
              <Title
                as="h2"
                className="mb-7 text-center text-[28px] font-bold leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl"
              >
                Join us today! Get special benefits and stay up-to-date.
              </Title>
            </div>

            <div className="flex flex-col gap-4 pb-6 md:flex-row md:gap-6 xl:pb-7">
              <Button variant="outline" className="h-11 w-full">
                <FcGoogle className="me-2 h-4 w-4 shrink-0" />
                <span className="truncate">Signin with Google</span>
              </Button>
              <Button variant="outline" className="h-11 w-full" color="primary">
                <BsFacebook className="me-2 h-4 w-4 shrink-0 md:h-5 md:w-5" />
                <span className="truncate">Signin with Facebook</span>
              </Button>
            </div>
            <OrSeparation
              title={`Or, Sign up with your email`}
              isCenter
              className="mb-5 2xl:mb-7 bg-white"
            />

            <FormSignUp />
          </div>
        </div>
      </div>
    </>
  );
};

export function OrSeparation({
  title,
  className,
  isCenter = false,
}: {
  title: string;
  className?: string;
  isCenter?: boolean;
}) {
  return (
    <div
      className={`before:content-[' '] relative  mt-0.5 flex items-center  before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-white ${className} ${
        isCenter ? "justify-center" : "justify-start"
      }`}
    >
      <span
        className={`relative z-10 inline-block bg-white text-sm font-medium text-gray-500  2xl:text-base ${
          isCenter ? "p-2.5" : "pe-2.5"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

export default PageSignUp;
