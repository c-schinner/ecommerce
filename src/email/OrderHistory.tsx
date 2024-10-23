import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";
import React from "react";

type OrderHistoryEmailProps = {
    orders: {
        id: string;
        pricePaidInCents: number;
        createdAt: Date;
        downloadVerificationId: string;
        product: {
            name: string;
            imagePath: string;
            description: string;
        };
    }[];
};

OrderHistoryEmail.PreviewProps = {
    orders: [
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 1000,
            downloadVerificationId: crypto.randomUUID(),
            product: {
                name: "Product name",
                imagePath: "",
                description: "Some Desc.",
            },
        },
    ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
    return (
        <Html>
            <Preview>Order History & Downloads</Preview>
            <Tailwind>
                <Head />
                <Body className="font-sans bg-white">
                    <Container className="mac-w-xl">
                        <Heading>Order History</Heading>
                        {orders.map((order, index) => (
                            <React.Fragment key={order.id}>
                                <OrderInformation
                                    order={order}
                                    product={order.product}
                                    downloadVerificationId={
                                        order.downloadVerificationId
                                    }
                                />
                                {index < orders.length - 1 && <Hr />}
                            </React.Fragment>
                        ))}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
