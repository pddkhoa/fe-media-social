import { Badge } from "rizzui";

export const getBadgeStatus = (status: string) => {
    switch (status) {
        case "Publish":
            return (
                <Badge rounded="md" className="shadow" variant="outline">
                    {status}
                </Badge>
            );
        case "Private":
            return (
                <Badge
                    rounded="md"
                    color="danger"
                    className="shadow"
                    variant="outline"
                >
                    {status}
                </Badge>
            );
        default:
            break;
    }
};
