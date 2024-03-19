import { cn } from "@/utils/class-name";

const metricCardClasses = {
  base: "border border-gray-200 bg-gray-0 p-5 shadow lg:p-6",
  rounded: {
    sm: "rounded-sm",
    DEFAULT: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl",
  },
};

type MetricCardTypes = {
  title: string;
  metric: React.ReactNode;
  icon?: React.ReactNode;
  iconClassName?: string;
  contentClassName?: string;
  chart?: React.ReactNode;
  info?: React.ReactNode;
  rounded?: keyof typeof metricCardClasses.rounded;
  titleClassName?: string;
  metricClassName?: string;
  chartClassName?: string;
  className?: string;
};

export default function MetricCard({
  title,
  metric,
  icon,
  chart,
  info,
  rounded = "DEFAULT",
  className,
  iconClassName,
  contentClassName,
  titleClassName,
  metricClassName,
  chartClassName,
  children,
}: React.PropsWithChildren<MetricCardTypes>) {
  return (
    <div
      className={cn(
        metricCardClasses.base,
        metricCardClasses.rounded[rounded],
        className
      )}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center ">
          {icon ? (
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-lg shadow lg:h-12 lg:w-12",
                iconClassName
              )}
            >
              {icon}
            </div>
          ) : null}

          <div className={cn(icon && "ps-3", contentClassName)}>
            <p className={cn("mb-0.5 ", titleClassName)}>{title}</p>
            <p
              className={cn(
                "font-lexend text-lg font-semibold text-gray-900  2xl:xl:text-xl",
                metricClassName
              )}
            >
              {metric}
            </p>

            {info ? info : null}
          </div>
        </div>

        {chart ? (
          <div className={cn("h-12 w-20", chartClassName)}>{chart}</div>
        ) : null}
      </div>

      {children}
    </div>
  );
}
