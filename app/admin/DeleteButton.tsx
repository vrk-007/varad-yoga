"use client";

export default function DeleteButton({ id }: { id: number }) {
    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this enquiry?"
        );

        if (!confirmed) return;

        const response = await fetch(`/api/contact/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            window.location.reload();
        } else {
            alert("Failed to delete enquiry");
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="text-red-600 hover:underline"
        >
            Delete
        </button>
    );
}