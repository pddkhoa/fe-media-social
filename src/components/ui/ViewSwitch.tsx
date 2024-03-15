import { PiListBullets, PiGridFour } from "react-icons/pi";
import { ActionIcon, cn } from "rizzui";

type ViewSwitcherProps = {
  setLayout: React.Dispatch<React.SetStateAction<string>>;
  layout: string;
};

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  setLayout,
  layout,
}) => {
  const handleLayoutToggle = (view: string) => {
    setLayout(view);
  };
  const isGridLayout = layout.toLocaleLowerCase() === "grid";

  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-1.5 px-1.5">
      <ActionIcon
        size="sm"
        variant="flat"
        className={cn(
          "group bg-transparent hover:enabled:bg-gray-100  ",
          isGridLayout && "bg-gray-900"
        )}
        onClick={() => handleLayoutToggle("grid")}
      >
        <PiGridFour
          className={cn(
            "h-5 w-5 transition-colors group-hover:text-gray-900",
            isGridLayout && "text-white"
          )}
        />
      </ActionIcon>
      <ActionIcon
        size="sm"
        variant="flat"
        className={cn(
          "group bg-transparent hover:enabled:bg-gray-100 ",
          !isGridLayout && "bg-gray-900  "
        )}
        onClick={() => handleLayoutToggle("list")}
      >
        <PiListBullets
          className={cn(
            "h-5 w-5 transition-colors group-hover:text-gray-900",
            !isGridLayout && "text-white"
          )}
        />
      </ActionIcon>
    </div>
  );
};
