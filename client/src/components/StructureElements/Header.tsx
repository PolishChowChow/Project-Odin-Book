import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-100 p-5 text-2xl shadow-md shadow-slate-200">
      <h1>
        <Link to={"/"}>OdinBook</Link>
      </h1>
    </header>
  );
}
