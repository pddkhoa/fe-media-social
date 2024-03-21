import { FC } from "react";
import {
    PiGlobeHemisphereEast,
    PiLockKey,
    PiCheckCircleFill,
} from "react-icons/pi";
import { RadioGroup, AdvancedRadio, Title } from "rizzui";

type PrivacyGroupsProps = {
    setSelectPrivacy: React.Dispatch<React.SetStateAction<string>>;
    selectPrivacy: string;
};

const privacyOptions = [
    {
        icon: <PiGlobeHemisphereEast className="h-4 w-4 text-gray-900" />,
        title: "Public",
        description:
            "Everyone can see the content, and the posts may appear on the main feed.",
        value: "Publish",
    },
    {
        icon: <PiLockKey className="h-4 w-4 text-gray-900" />,
        title: "Private",
        description: "Only people who join the group can see the content.",
        value: "Private",
    },
];

export const PrivacyGroups: FC<PrivacyGroupsProps> = ({
    setSelectPrivacy,
    selectPrivacy,
}) => {
    return (
        <RadioGroup
            value={selectPrivacy}
            setValue={setSelectPrivacy}
            className="flex flex-col gap-5 "
        >
            {privacyOptions.map((plan, index) => (
                <AdvancedRadio
                    key={`plan-${index}`}
                    name="current_plans"
                    value={plan.value}
                    onChange={() => setSelectPrivacy(plan.value)}
                    checked={plan.value === selectPrivacy}
                    className="flex flex-col space-y-2 rounded-xl  text-sm hover:cursor-pointer hover:border-gray-900"
                    inputClassName="[&:checked~span_div>.icon]:block [&:checked~span]:ring-1 [&:checked~span]:ring-offset-0 [&:checked~span]:ring-gray-900 [&:checked~span]:!border-gray-900"
                >
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                            {plan.icon}
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between">
                                <Title
                                    as="h6"
                                    className="mb-1 text-sm font-medium text-gray-900"
                                >
                                    {plan.title}
                                </Title>
                                <PiCheckCircleFill className="icon hidden h-6 w-6 flex-shrink-0 text-gray-900" />
                            </div>
                            <p className="text-gray-500">{plan.description}</p>
                        </div>
                    </div>
                </AdvancedRadio>
            ))}
        </RadioGroup>
    );
};
