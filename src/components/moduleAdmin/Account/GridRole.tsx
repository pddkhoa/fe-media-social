import { cn } from "@/utils/class-name";
import { ROLES } from "@/utils/contants";
import RoleCard from "./RolesCard";
import { User } from "@/type/user";

interface RolesGridProps {
    className?: string;
    gridClassName?: string;
    support: User[];
    user: User[];
    admin: User[];
}

export default function RolesGrid({
    className,
    gridClassName,
    support,
    user,
    admin,
}: RolesGridProps) {
    const rolesList = [
        {
            name: ROLES.Administrator,
            color: "#2465FF",
            data: admin,
        },

        {
            name: ROLES.Support,
            color: "#8A63D2",
            data: support,
        },
        {
            name: ROLES.Customer,
            color: "#FF1A1A",
            data: user,
        },
    ];
    return (
        <div className={cn("@container", className)}>
            <div className={cn("grid grid-cols-3 gap-6", gridClassName)}>
                {rolesList.map((role) => (
                    <RoleCard key={role.name} {...role} data={role.data} />
                ))}
            </div>
        </div>
    );
}
