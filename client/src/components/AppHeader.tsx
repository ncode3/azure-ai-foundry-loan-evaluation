import { Link } from "wouter";

export default function AppHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center">
            <svg className="h-8 w-8 text-[#0078D4] mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="currentColor" d="M20.87 26.23H6.92l13.95-24.06v24.06Zm.23 19.71L6.92 27.73h25.51l-11.33 18.21Z"/>
            </svg>
            <div>
              <h1 className="text-xl font-semibold text-[#424242]">Azure AI Foundry</h1>
              <p className="text-sm text-[#9E9E9E]">Ethical Loan Evaluation Platform</p>
            </div>
          </a>
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#" className="text-[#9E9E9E] hover:text-[#0078D4] text-sm font-medium">Documentation</a>
          <a href="#" className="text-[#9E9E9E] hover:text-[#0078D4] text-sm font-medium">Settings</a>
          <div className="flex items-center ml-4">
            <div className="w-8 h-8 rounded-full bg-[#0078D4] flex items-center justify-center text-white">
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
