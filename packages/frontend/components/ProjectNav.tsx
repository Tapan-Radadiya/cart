import Link from "next/link";

type Props = {
  projectId: string;
  active: "overview" | "upload" | "docs" | "chat";
};

const navItems = [
  { key: "overview", label: "Overview" },
  { key: "upload", label: "Upload" },
  { key: "docs", label: "Docs" },
  { key: "chat", label: "Chat" },
];

export default function ProjectNav({ projectId, active }: Props) {
  return (
    <nav className="flex gap-4 border-b mb-6 pb-2">
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={`/dashboard/${projectId}${item.key === "overview" ? "" : `/${item.key}`}`}
          className={`px-2 py-1 rounded font-medium transition ${
            active === item.key
              ? "bg-blue-600 text-white"
              : "text-blue-700 hover:bg-blue-100"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}