import { FC } from "react";
import { ViewSwitcher } from "../../ui/ViewSwitch";
import { Input, Title } from "rizzui";
import { PiMagnifyingGlassBold } from "react-icons/pi";

type GroupHeaderProps = {
    layout?: string;
    setLayout?: React.Dispatch<React.SetStateAction<string>>;
    title?: string;
    setSearchText?: React.Dispatch<React.SetStateAction<string>>;
    searchText?: string;
};

const GroupHeader: FC<GroupHeaderProps> = ({
    title,
    setLayout,
    layout,
    setSearchText,
    searchText,
}) => {
    return (
        <div className="flex justify-between items-center">
            <Title as="h4" className="font-medium">
                {title}
            </Title>
            <div className="order-2 w-1/3 ml-auto flex basis-1/2 items-center justify-end gap-3 md:order-3 md:basis-auto	md:gap-5	">
                {setSearchText && (
                    <Input
                        variant="flat"
                        value={searchText}
                        onChange={(e) => setSearchText(() => e.target.value)}
                        placeholder="Search here"
                        className="flex-1"
                        prefix={
                            <PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />
                        }
                    />
                )}

                {layout && setLayout && (
                    <ViewSwitcher setLayout={setLayout} layout={layout} />
                )}
            </div>
        </div>
    );
};

export default GroupHeader;
