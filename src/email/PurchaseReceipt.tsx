import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Tailwind,
} from "@react-email/components";

export default function PurchaseReceiptEmail({ product }) {
    return (
        <Html>
            <Preview>Download {product.name} and view receipt</Preview>
            <Tailwind>
                <Head />
                <Body className="font-sans bg-white">
                    <Container className="mac-w-xl">
                        <Heading>Purchase Receipt</Heading>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
