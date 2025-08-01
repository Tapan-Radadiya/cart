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
    <nav className="flex gap-2 border-b border-gray-200 mb-6">
      {navItems.map((item) => {
        const isActive = active === item.key;
        return (
          <Link
            key={item.key}
            href={`/dashboard/${projectId}${item.key === "overview" ? "" : `/${item.key}`}`}
            className={
              isActive
                ? "px-3 py-2 rounded-t-md bg-brand-600 text-white shadow"
                : "px-3 py-2 rounded-t-md text-gray-600 hover:bg-gray-100 hover:text-brand-700"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}