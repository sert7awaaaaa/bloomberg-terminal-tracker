
import { LineChart, Briefcase, Settings, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-black border-t border-[#003300]">
      <NavItem icon={<LineChart size={20} />} label="Markets" active />
      <NavItem icon={<Briefcase size={20} />} label="Portfolio" />
      <NavItem 
        icon={<Linkedin size={20} />} 
        label="LinkedIn" 
        href="https://www.linkedin.com/in/elmehdi-khouriss"
      />
      <NavItem icon={<Settings size={20} />} label="Settings" />
    </nav>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}

function NavItem({ icon, label, active, href }: NavItemProps) {
  const content = (
    <div
      className={cn(
        "flex flex-col items-center gap-1 p-2 text-[#00ff00] font-['JetBrains_Mono',monospace]",
        active && "bg-[#001100] border border-[#003300]"
      )}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
        {content}
      </a>
    );
  }

  return content;
}
