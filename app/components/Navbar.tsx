export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 border-b">
      <h1 className="text-2xl font-bold ">
        Varad Yogvarga
      </h1>

      <div className="flex gap-6">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Classes</a>
        <a href="#">Contact</a>
      </div>
    </nav>
  );
}