import { Link } from "wouter";

export default function AppHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <div className="h-10 w-10 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 140">
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0078D4" />
                    <stop offset="75%" stopColor="#8661C5" />
                    <stop offset="100%" stopColor="#E74C84" />
                  </linearGradient>
                </defs>
                <path d="M110 40 L150 40 C170 40 180 60 170 80 L130 80 C110 80 100 60 110 40 Z" fill="url(#logo-gradient)"/>
                <path d="M90 60 L130 60 C140 60 145 70 140 80 L100 80 C90 80 85 70 90 60 Z" fill="url(#logo-gradient)"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#424242]">Azure AI Foundry</h1>
              <p className="text-sm text-[#9E9E9E]">Ethical Loan Evaluation Platform</p>
            </div>
          </div>
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/documentation">
            <span className="text-[#9E9E9E] hover:text-[#8661C5] text-sm font-medium cursor-pointer">Documentation</span>
          </Link>
          <Link href="/settings">
            <span className="text-[#9E9E9E] hover:text-[#8661C5] text-sm font-medium cursor-pointer">Settings</span>
          </Link>
          <div className="flex items-center ml-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0078D4] via-[#8661C5] to-[#E74C84] flex items-center justify-center text-white">
              <span className="text-sm font-medium">AI</span>
            </div>
          </div>
        </div>
        <button className="md:hidden text-[#9E9E9E]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}
