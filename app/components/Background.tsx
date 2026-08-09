export default function Background() {
    return (
        <div
            className="fixed inset-0 -z-10 bg-center  bg-contain bg-no-repeat opacity-30"
            style={{
                backgroundImage: "url('/yoga-hero.png')",
            }}
        />
    );
}