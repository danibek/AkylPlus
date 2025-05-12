import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { Decimal } from "@prisma/client/runtime/library";

export async function POST(
  req: NextRequest,
  context: { params: { courseId: string } }
) {
  const { params } = context;

  try {
    const user = await currentUser();
    console.log("Пайдаланушы:", user);

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (
      !course.price ||
      (course.price instanceof Decimal && course.price.toNumber() <= 0)
    ) {
      return new NextResponse("Invalid price", { status: 400 });
    }

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });
    // console.log(purchase, 'server2')
    if (purchase) {
      return new NextResponse("Already Purchased", { status: 400 });
    }

    const price =
      course.price instanceof Decimal
        ? course.price.toNumber()
        : Number(course.price);

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses?.[0]?.emailAddress,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "kzt",
          product_data: {
            name: course.title,
            description: course.description || undefined,
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
      payment_method_types: ["card"],
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("COURSE_ID_CHECKOUT", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Error";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
