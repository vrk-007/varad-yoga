import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;
        const contactId = Number(id);

        if (!Number.isInteger(contactId)) {
            return NextResponse.json(
                { error: "Invalid contact ID" },
                { status: 400 }
            );
        }

        const contact = await prisma.contact.findUnique({
            where: {
                id: contactId,
            },
        });

        if (!contact) {
            return NextResponse.json(
                { error: "Contact not found" },
                { status: 404 }
            );
        }

        await prisma.contact.delete({
            where: {
                id: contactId,
            },
        });

        return NextResponse.json({
            message: "Contact deleted successfully",
        });
    } catch (error) {
        console.error("Delete contact error:", error);

        return NextResponse.json(
            { error: "Failed to delete contact" },
            { status: 500 }
        );
    }
}