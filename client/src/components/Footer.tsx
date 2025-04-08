export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white mt-auto border-t border-[#E0E0E0]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <svg className="h-6 w-6 text-[#0078D4] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="currentColor" d="M20.87 26.23H6.92l13.95-24.06v24.06Zm.23 19.71L6.92 27.73h25.51l-11.33 18.21Z"/>
            </svg>
            <span className="text-sm text-[#9E9E9E]">© {currentYear} Microsoft Corporation. All rights reserved.</span>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-[#9E9E9E] hover:text-[#0078D4]">Privacy</a>
            <a href="#" className="text-sm text-[#9E9E9E] hover:text-[#0078D4]">Terms of Use</a>
            <a href="#" className="text-sm text-[#9E9E9E] hover:text-[#0078D4]">Contact</a>
            <a href="#" className="text-sm text-[#9E9E9E] hover:text-[#0078D4]">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
