import { ArrowRight } from "lucide-react"
import PrimaryButton from "../components/ui/button/PrimaryButton"
import Navbar from "../components/user/navbar/Navbar"
import FeatureCard from "../components/ui/cards/FeatureCard"
import { FeatureCardData } from "../data/user/featureCardData"
import PdfUpload from "../components/user/pdfupload/PdfUpload"

const HomePage = ()=>{

  // scroll to bottom 
  const scrollToBottom = ()=>{
    window.scrollTo(
      {
        top:document.documentElement.scrollHeight,
        behavior:"smooth"
      }
    )
  }
    return (
        <>
          <Navbar/>
        <div className="w-full min-h-screen">
         {/* Hero session */}
         <div className="relative isolate">
        <div className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-200 to-indigo-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

         <div className="px-6 mx-auto max-w-7xl py-36 sm:py-40 lg:px-8">
          <div className="max-w-2xl mx-auto text-center ">
               <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">Transform Your PDFs with Precision</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 ">
            Extract specific pages from your PDF documents instantly. No installation needed, Just upload and extract.
            </p>
            <div className="flex justify-center mx-auto mt-6">
                <PrimaryButton action={scrollToBottom} Icon={ArrowRight}  size="md" text="Get Started"/>
            </div>
          </div>
         </div>
         </div>

         {/* Feature Grid */}
         <div className="px-6 py-16 mx-auto max-w-7xl lg:px-8 ">
           <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-3xl font-bold tracking-tighter text-slate-900">Everything you need to handle PDFs</h2>
           <p className="mt-4 text-lg text-slate-600">Professional tools made simple for everyone.</p>
           </div>

           <div className="grid max-w-5xl grid-cols-1 gap-8 mx-auto mt-16 sm:grid-cols-2 lg:grid-cols-3 ">
            {
              FeatureCardData.map((data)=>(
                <FeatureCard Icon={data.Icon} title={data.title} description={data.description}/>
              ))
            }
           </div>
         </div>
        </div>

        {/* pdf upload  section*/}
        <PdfUpload/>
          {/* footer */}
     <footer className="py-6 bg-gray-50 md:py-8">
     <div className="container px-4 mx-auto text-center text-gray-600">
      <p>© 2025 PDFExtract. All rights reserved.</p>
     </div>
     </footer>
        </>
    )
}

export default HomePage