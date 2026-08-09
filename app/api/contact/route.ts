import { Resend } from "resend"
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    const body = await request.json();
    //const { name, email, message } = body;
    const name = String(body.name).trim();
    const email = String(body.email).trim();
    const message = String(body.message).trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
        return Response.json(
            {
                success: false,
                message: "Name is required."
            },
            { status: 400 }
        );
    }
    if (!email) {
        return Response.json(
            {
                success: false,
                message: "Email is required."
            },
            { status: 400 }
        );
    }
    if (!emailRegex.test(email)) {
        return Response.json(
            {
                success: false,
                message: "Please enter a valid email address."
            },
            { status: 400 }
        );
    }
    if (!message) {
        return Response.json(
            {
                success: false,
                message: "Message is required"
            },
            { status: 400 }
        )
    };
    await prisma.contact.create({
        data: {
            name,
            email,
            message,
        },
    });

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "varadvrk007@gmail.com",
        subject: "New Yoga Enquiry",
        html: `
        <h2>New Yoga Enquiry</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
  `,
    });
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Thank You for Contacting Varad Yoga 🧘",
        html: `
        <h2>Hi ${name},</h2>

        <p>Thank you for reaching out to <strong>Varad YogVarga</strong>.</p>

        <p>We have successfully received your enquiry.</p>

        <p>Our team will contact you shortly regarding class timings and further details.</p>

        <p>We look forward to helping you begin your yoga journey.</p>
        <p> Stay fit , Stay Happy </p>

        <br/>

        <p>Warm regards,</p>

        <h3>Varad YogVarga 🧘</h3>
        `,
    });

    console.log(body);

    return Response.json({
        success: true,
        message: "Email Sent Sucessfully!"
    });
}



export async function GET() {
    try {
        const contacts = await prisma.contact.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(contacts);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to fetch contacts" },
            { status: 500 }
        );
    }
}




//npx neonctl@latest init
//Host
// ep-small-waterfall-azjlkynq.c-3.ap-southeast-1.aws.neon.tech
//Database
//neondb
//Role
//neondb_owner
//Password
//************
//Pooler host
//  ep-small-waterfall-azjlkynq-pooler.c-3.ap-southeast-1.aws.neon.tech