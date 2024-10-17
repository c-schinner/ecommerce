import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, 
    { 
        params: {downloadVerificationId },
    }: { params: { downloadVerificationId: string}}) 
    {
        const data = await db.downloadVerification.findUnique({ where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
        select: { product: { select: { filePath: true, name: true }}}
    })

    if (data == null) {
        return NextResponse.redirect(new URL("/products/download/expired", req.url))
    }
    return new NextResponse("Hello")
}