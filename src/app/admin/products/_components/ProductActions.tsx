import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";

export function ActiveToggleDropdownItem({
    id,
    isAvailableForPurchase,
}: {
    id: string;
    isAvailableForPurchase: boolean;
}) {
    const [isPending, startTransition] = useTransition();
    return (
        <DropdownMenuItem
            onClick={() => {
                startTransition(async () => {
                    await toggleProductAvailability(
                        id,
                        !isAvailableForPurchase
                    );
                });
            }}
        ></DropdownMenuItem>
    );
}

export function DeactivateDropdownItem() {}
