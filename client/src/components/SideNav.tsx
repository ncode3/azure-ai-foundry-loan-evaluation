import { Link, useLocation } from "wouter";

export default function SideNav() {
  const [location] = useLocation();

  const navItems = [
    { 
      path: "/", 
      label: "Loan Evaluation", 
      icon: "assessment"
    },
    { 
      path: "/evaluation-history", 
      label: "Evaluation History", 
      icon: "history"
    },
    { 
      path: "/ai-settings", 
      label: "AI Settings", 
      icon: "tune" 
    },
    { 
      path: "/azure-integrations", 
      label: "Azure Integrations", 
      icon: "cloud"
    },
    { 
      path: "/reports", 
      label: "Reports", 
      icon: "summarize"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-medium text-sm text-[#9E9E9E] uppercase tracking-wider mb-4">NAVIGATION</h3>
      <nav>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>
                <a className={`flex items-center py-2 px-3 rounded-md ${location === item.path ? "bg-[#E1EFFF] text-[#0078D4]" : "text-[#9E9E9E] hover:bg-[#F5F5F5]"}`}>
                  <span className="material-icons text-sm mr-3">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
