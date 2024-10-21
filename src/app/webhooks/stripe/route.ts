import { NextRequest } from "next/server";
import Stripe from "stripe"

// Go to the stripe page and follow the create local listener directions to complete this.
// Im going to skip for now, because we dont really need this functionality at the moment.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
    stripe.webhooks.constructEvent(await req.text(), req.headers.get("stripe-signature"), process.env.STRIPE_WEBHOOK_SECRET)
}