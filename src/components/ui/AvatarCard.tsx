import { cn } from "@/utils/class-name";
import { AvatarProps, Avatar } from "rizzui";

interface AvatarCardProps {
    src?: string;
    name: string;
    className?: string;
    description?: string;
    avatarProps?: AvatarProps;
}

export default function AvatarCard({
    src,
    name,
    className,
    description,
}: AvatarCardProps) {
    return (
        <figure className={cn("flex items-center gap-3", className)}>
            {name && (
                <Avatar
                    name={name}
                    src={src}
                    size="md"
                    className="rounded-lg"
                />
            )}
            <figcaption className="grid gap-0.5">
                <p className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700">
                    {name}
                </p>
                {description && (
                    <p className="text-[13px] text-gray-500">{description}</p>
                )}
            </figcaption>
        </figure>
    );
}
