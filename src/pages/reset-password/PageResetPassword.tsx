import FormResetPassword from "@/components/form/FormResetPassword";
import { WaveShape, TreeShape } from "@/components/ui/Shape";
import { cn } from "@/utils/class-name";
import { Title } from "rizzui";

const PageResetPassword = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 lg:p-5 ">
      <div
        className={cn(
          " 2xl:!px-0 mx-auto mt-5 flex w-full grow items-center justify-center gap-10 lg:max-w-5xl lg:justify-between xl:w-auto xl:max-w-7xl 2xl:max-w-[1720px]"
        )}
      >
        <div
          className={cn(
            "w-full max-w-sm md:max-w-md xl:max-w-lg xl:shrink-0 2xl:w-[656px] 2xl:max-w-none"
          )}
        >
          <div className="mb-10 px-4 text-center lg:px-0 lg:text-start">
            <Title
              as="h2"
              className="mb-5 text-[26px] leading-normal @container md:text-3xl md:!leading-normal lg:mb-7 lg:pe-8 lg:text-3xl xl:pe-16 xl:text-[32px] 2xl:pe-0 2xl:text-4xl"
            >
              Don&apos;t worry, we&apos;ve got you covered!{" "}
              <span className="relative px-2 text-white">
                <span className="relative z-10">RESET</span>{" "}
                <WaveShape className="absolute left-0 top-1/2 h-11 w-24 -translate-y-1/2 text-primary md:h-[52px] md:w-28 xl:h-14 xl:w-[120px] 2xl:w-[132px]" />
              </span>{" "}
              your password in no time.
            </Title>
          </div>
          <FormResetPassword />
        </div>
        <div className="hidden pt-10 text-center lg:block lg:w-[500px] xl:w-[600px]  2xl:block 2xl:w-[730px]">
          <div className="relative mx-auto aspect-[1/1.015] w-[540px]">
            <img
              src={
                "https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-in-thumb5.webp"
              }
              alt="Sign Up Thumbnail"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto mb-6 mt-auto flex w-full justify-end border-b border-gray-900 pe-1 pt-10 lg:mb-10 xl:max-w-7xl 2xl:max-w-[1720px]">
        <TreeShape className="relative -mb-3 h-12 w-16 md:h-14 md:w-20 lg:h-[70px] lg:w-28" />
      </div>
    </div>
  );
};

export default PageResetPassword;
