import { Button } from "@/app/components/ui/button";
import db from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Server action to create download verification
async function downloadAction(productId: string): Promise<void> {
    "use server";

    const download = await db.downloadVerification.create({
        data: {
            productId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
        },
    });

    redirect(`/products/download/${download.id}`);
}

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: { payment_intent: string };
}) {
    const paymentIntent = await stripe.paymentIntents.retrieve(
        searchParams.payment_intent
    );

    if (!paymentIntent.metadata.productId) return notFound();

    const product = await db.product.findUnique({
        where: { id: paymentIntent.metadata.productId },
    });

    if (!product) return notFound();

    const isSuccess = paymentIntent.status === "succeeded";

    return (
        <div className="max-w-5xl w-full mx-auto space-y-8">
            <h1 className="text-4xl font-bold">
                {isSuccess ? "Success!" : "Error!"}
            </h1>
            <div className="flex gap-4 items-center">
                <div className="aspect-video flex-shrink-0 w-1/3 relative">
                    <Image
                        src={product.imagePath}
                        fill
                        alt={product.name}
                        className="object-cover"
                    />
                </div>
                <div>
                    <div className="text-lg">
                        {formatCurrency(product.priceInCents / 100)}
                    </div>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <div className="line-clamp-3 text-muted-foreground">
                        {product.description}
                    </div>

                    {isSuccess ? (
                        <form action={downloadAction.bind(null, product.id)}>
                            <Button className="mt-4" size="lg" type="submit">
                                Download
                            </Button>
                        </form>
                    ) : (
                        <Link href={`/products/${product.id}/purchase`}>
                            <Button className="mt-4" size="lg">
                                Try Again
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
