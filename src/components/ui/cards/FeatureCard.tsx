
import { ElementType } from "react"



interface Props{
    Icon?:ElementType
    title:string,
    description:string
}



const FeatureCard:React.FC<Props> = ({Icon,title,description})=>{
    return(
        <div className="flex flex-col p-8 transition-shadow bg-white shadow-sm rounded-2xl hover:shadow-md ring-slate-200 ring-1">
            <div className="mb-4">
                {
                    Icon && 
            <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-indigo-50">
                <Icon className="w-6 h-6 text-indigo-600"/>
            </div>
                }
            </div>
            <h3 className="text-lg font-semibold text-slate-900">  {title || 'Core Feature'}</h3>
            <p className="mt-2 text-slate-600"> {description || 'Premium feature offering enhanced capabilities. Details available upon implementation.'}</p>
        </div>
    )
}

export default FeatureCard