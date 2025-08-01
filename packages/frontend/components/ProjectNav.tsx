import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  name: string;
  href: string;
}

const tabs: Tab[] = [
  { name: "Overview", href: "overview" },
  { name: "Files", href: "files" },
  { name: "Settings", href: "settings" },
];

export function ProjectNav({ projectId }: { projectId: string }) {
  const pathname = usePathname();

  return (
    <nav className="mb-8 border-b border-gray-200">
      <ul className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const active = pathname?.includes(`/dashboard/${projectId}/${tab.href}`);
          return (
            <li key={tab.name}>
              <Link
                href={`/dashboard/${projectId}/${tab.href}`}
                className={
                  active
                    ? "border-brand-600 text-brand-700 whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium"
                    : "border-transparent text-brand-700 hover:bg-brand-100 hover:text-brand-700 whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium"
                }
              >
                {tab.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}