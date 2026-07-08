type HeroProps = {
    title: string;
    subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center bg-center">
            <h1 className="text-5xl font-extrabold text-amber-200">
                {title}
            </h1>

            <p className="text-xl mt-4">
                {subtitle}
            </p>

            <p className="mt-4 text-gray-600 max-w-2xl">
                Online and Offline Yoga Classes for all age groups.
            </p>

            <button className="bg-black text-white px-6 py-3 mt-6 rounded-lg hover:bg-blue-700">
                Join Now
            </button>
        </div>
    );
}