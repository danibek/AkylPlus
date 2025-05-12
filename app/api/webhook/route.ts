// This file handles webhook events from Stripe. It verifies the signature
// of each request to ensure that the request is coming from Stripe. It also
// handles the checkout.session.completed event type by creating a new purchase record in the database.
import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

import { createLogging } from "@/lib/logging";

export async function POST(req: Request) {
  console.log("Webhook received", new Date().toISOString());

  // Логируем все заголовки для отладки
  const headersList = headers();
  const allHeaders: Record<string, string> = {};
  headersList.forEach((value, key) => {
    allHeaders[key] = value;
  });
  console.log("Headers:", JSON.stringify(allHeaders));

  const body = await req.text();
  const signature = headers().get("stripe-signature") as string;

  console.log("Signature:", signature ? "Present" : "Missing");

  let event: Stripe.Event;
  console.log(body, "server0");
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("Event constructed successfully:", event.type);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Webhook Error:", errorMessage);
    await createLogging({
      url: req.url,
      method: req.method,
      body,
      statusCode: 400,
      errorMessage,
      createdAt: new Date(),
    });
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }
  console.log(event, "server1");
  try {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(session, "server2");
    if (event.type === "checkout.session.completed") {
      console.log("Processing checkout.session.completed");
      const userId = session?.metadata?.userId;
      const courseId = session?.metadata?.courseId;
      const amount = session.amount_total ? session.amount_total / 100 : 0;

      console.log("Metadata:", { userId, courseId, amount });

      if (!userId || !courseId) {
        throw new Error("Missing metadata");
      }

      if (session.payment_status !== "paid") {
        throw new Error("Payment not completed");
      }

      console.log("Creating purchase record");
      const purchase = await db.purchase.create({
        data: {
          courseId,
          userId,
          amount,
          currency: "KZT",
        },
      });
      console.log("Purchase created:", purchase);

      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: true,
        },
      });
      console.log("Course updated");

      await createLogging({
        url: req.url,
        method: req.method,
        body,
        statusCode: 200,
        createdAt: new Date(),
      });

      return NextResponse.json({ purchase });
    }

    console.log("Unhandled event type:", event.type);
    return new NextResponse(null, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Processing Error:", errorMessage);
    await createLogging({
      url: req.url,
      method: req.method,
      body,
      statusCode: 500,
      errorMessage,
      createdAt: new Date(),
    });
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 500 });
  }
}
