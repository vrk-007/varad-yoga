import { prisma } from "@/lib/prisma";
import DeleteButton from "./DeleteButton";
import LogoutButton from "./LogoutButton";

export default async function AdminPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const { search = "" } = await searchParams
    const contacts = await prisma.contact.findMany({
        where: search ?
            {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        email: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            } : undefined,
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <main className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">
                Contact Enquiries
            </h1>
            <LogoutButton/>

            <form action="/admin" method="GET" className="mb-6">
                <input
                    type="text"
                    name="search"
                    placeholder="Search by name or email.."
                    className="w-full border rounded-lg p-3" />
            </form>

            <div className="overflow-x-auto rounded-xl shadow-lg border">
                <table className="w-full border-collapse">
                    <thead className="bg-black">
                        <tr>
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Message</th>
                            <th className="text-left p-4">Date</th>
                            <th className="text-left p-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {contacts.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center p-8 text-gray-500"
                                >
                                    📭 No enquiries yet.
                                </td>
                            </tr>
                        ) :
                            (contacts.map((contact) => (
                                <tr
                                    key={contact.id}
                                    className="border-t hover:bg-yellow-950 transition"
                                >
                                    <td className="p-4">{contact.name}</td>
                                    <td className="p-4">{contact.email}</td>
                                    <td className="p-4 max-w-sm">
                                        <p className="truncate">{contact.message}</p>
                                        <details className="mt-2">
                                            <summary className="cursur-pointer text-blue-600 hover:underline text-sm">
                                                view
                                            </summary>
                                            <p className="mt-2 whitespace-pre-wrap text-gray-700">
                                                {contact.message}
                                            </p>
                                        </details>

                                    </td>
                                    <td className="p-4">
                                        {new Date(contact.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="p-4">
                                        <DeleteButton id={contact.id} />
                                    </td>
                                </tr>
                            )))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}