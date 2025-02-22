import { Package, Type } from "lucide-react";

export enum Icon {
    Package,
    Type,
}

export function XIcon({
    icon,
    ...props
}: { icon: Icon } & React.ComponentProps<typeof Package>) {
    return (
        <>
            {icon === Icon.Package && <Package {...props} />}
            {icon === Icon.Type && <Type {...props} />}
        </>
    );
}
