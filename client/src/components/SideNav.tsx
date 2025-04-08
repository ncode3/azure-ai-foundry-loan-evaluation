import { Link, useLocation } from "wouter";

export default function SideNav() {
  const [location] = useLocation();

  const navItems = [
    { 
      path: "/", 
      label: "Loan Evaluation", 
      icon: "assessment",
      enabled: true
    },
    { 
      path: "/evaluation-history", 
      label: "Evaluation History", 
      icon: "history",
      enabled: true
    },
    { 
      path: "/ai-settings", 
      label: "AI Settings", 
      icon: "tune",
      enabled: true
    },
    { 
      path: "/azure-integrations", 
      label: "Azure Integrations", 
      icon: "cloud",
      enabled: true
    },
    { 
      path: "/reports", 
      label: "Reports", 
      icon: "summarize",
      enabled: true
    },
    { 
      path: "/test", 
      label: "API Test Page", 
      icon: "bug_report",
      enabled: true
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
                <div className={`flex items-center py-2 px-3 rounded-md cursor-pointer ${
                  location === item.path 
                    ? "bg-gradient-to-r from-[#0078D4]/10 via-[#8661C5]/10 to-[#E74C84]/10 text-[#8661C5]" 
                    : "text-[#9E9E9E] hover:bg-[#F5F5F5]"
                }`}>
                  <span className="material-icons text-sm mr-3">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                  {!item.enabled && (
                    <span className="ml-auto bg-[#F5F5F5] text-[#9E9E9E] text-xs px-2 py-0.5 rounded">
                      Coming Soon
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
