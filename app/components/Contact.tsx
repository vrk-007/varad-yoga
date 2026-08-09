"use client";
import { useState } from "react";


export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
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
            console.log("Backend responded");

            if (response.ok) {
                setSuccess(true);
                setName("");
                setEmail("");
                setMessage("");
            }
            else {
                setError(data.message);
            }
            console.log(data);
            console.log("success:", success);
        } catch (error) {
            console.error(error);
            setError("Something went wrong ! Please try again");
        }
        finally {
            setLoading(false);
        }

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
                    onChange={(e) => {
                        setName(e.target.value);
                        setSuccess(false);
                        setError("");
                    }
                    }

                    className="border rounded-lg p-3"
                />

                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setSuccess(false);
                        setError("");
                    }
                    }
                    className="border rounded-lg p-3"
                />

                <textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        setSuccess(false);
                        setError("");
                    }
                    }
                    rows={5}
                    className="border rounded-lg p-3"
                ></textarea>

                < button
                    type="submit"
                    disabled={loading}
                    className="bg-amber-300 text-white rounded-lg py-3"
                >
                    {loading ? " Sending..." : success ? "✅ Message sent" : "Send message"}
                </button>


            </form>
            {error && (
                <p className="mt-4 text-red-500 font-medium">
                    {error}
                </p>
            )}
        </section>
    );
}