import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"

// Go to the stripe page and follow the create local listener directions to complete this.
// Im going to skip for now, because we dont really need this functionality at the moment.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
    const event = await stripe.webhooks.constructEvent(
        await req.text(),
        req.headers.get("stripe-signature") as string, 
        process.env.STRIPE_WEBHOOK_SECRET as string
    )

    if (event.type === "charge.succeeded") {
        const charge = event.data.object
        const productId = charge.metadata.productId
        const email = charge.billing_details.email
        const pricePaidInCents = charge.amount

        const product = await db.product.findUnique({ where: { id: productId }})
        if (product == null || email == null) return new NextResponse("Bad Request")
    }
}