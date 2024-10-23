"use client";

import { emailOrderHistory } from "@/actions/orders";
import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";

export default function MyOrdersPage() {
    const [data, action] = useFormState(emailOrderHistory, {});
    return (
        <form action={action} className="max-2-xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>
                        Enter your email and we will email you your order
                        history and download links
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" required name="email" id="email" />
                        {data.error && (
                            <div className="text-destructive">{data.error}</div>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    {data.message ? <p>{data.message}</p> : <SubmitButton />}
                </CardFooter>
            </Card>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="w-full" size="lg" disabled={pending} type="submit">
            {pending ? "Sending..." : "Send"}
        </Button>
    );
}
