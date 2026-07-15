"use client";
import { useState } from "react";


export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                message,
            }),
        });

        const data = await response.json();

        console.log(data);
    };

    return (

        <section className="py-20 mx-auto text-center">
            <h2 className="text-4xl extrabold">
                Contact us
            </h2>
            <address className="text-center mt-10 non-italic space-y-4">
                <p>📞 <strong>Phone: </strong> +91 93shshhshs</p>

                <p>📧 <strong>Email:</strong> sahsasa0.com</p>

                <p>
                    📍 <strong>Location:</strong>Msgsas ap as
                </p>

                <p>
                    🕒 <strong>Class Timings:</strong>
                    <br />
                    Morning: 6:00 AM – 9:00 AM
                    <br />
                    Evening: 4:00 PM – 6:00 PM
                </p>
            </address>
            <p className="mt-4">
                We'd love to hear from you.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded-lg p-3"
                />

                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-lg p-3"
                />

                <textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="border rounded-lg p-3"
                ></textarea>

                <button
                    type="submit"
                    className="bg-amber-300 text-white rounded-lg py-3"
                >
                    Send Message
                </button>

            </form>
        </section>
    );
}