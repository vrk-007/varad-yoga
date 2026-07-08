export default function Background() {
    return (
        <div
            className="fixed inset-0 -z-10 bg-center  bg-contain opacity-40"
            style={{
                backgroundImage: "url('/yoga-hero.png')",
            }}
        />
    );
}