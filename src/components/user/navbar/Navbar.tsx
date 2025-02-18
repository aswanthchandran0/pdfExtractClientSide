import {  Sparkles } from "lucide-react"


const Navbar  = ()=>{
    return (
      <nav className="relative z-50 bg-white border-b border-slate-200 ">
<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
 <div className="flex items-center justify-between h-16 ">
    <div className="flex items-center ">
   <Sparkles className="w-8 h-8 text-indigo-600"/>
   <span className="ml-2 text-xl font-bold text-slate-900">PDFExtract</span>
    </div>

    
 </div>
</div>
      </nav>
    )
}


export default Navbar