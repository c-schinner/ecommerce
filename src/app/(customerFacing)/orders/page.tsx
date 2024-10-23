import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";

export default function MyOrdersPage() {
    return (
        <form className="max-2-xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>
                        Enter your email and we will email you your order
                        history and download links
                    </CardDescription>
                </CardHeader>
            </Card>
        </form>
    );
}
