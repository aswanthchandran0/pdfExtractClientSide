import clsx from "clsx";
import { ElementType } from "react";


interface Props {
    text: string;
    Icon?:  ElementType;
    action: () => void;
    size: "sm" | "md" | "lg";
    className?:string
  }

const PrimaryButton:React.FC<Props> = ({text ='Button',Icon,action,size = 'md',className = ''})=>{

      // size varient
//   const sizeClasses = {
//     sm: "px-4 md:px-6 py-2 text-sm",
//     md: "px-6 md:px-8 py-3 text-base",
//     lg: "px-8 md:px-10 py-4 text-lg",
//   };

  //  Define icon size based on the button size
  const iconSize ={
    sm:16,
    md:20,
    lg:24
  }[size]


    return (
       <button
       
       onClick={action}
       className={clsx("flex gap-x-6 rounded-xl px-8 text-sm font-semibold shadow-sm py-4 text-white  focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 items-center bg-indigo-600 focus-visible:outline hover:bg-indigo-500",
        className
       )}
       >
   {text}
   {
    Icon &&  <Icon size={iconSize} />
   }
       </button>
    )
}


export default PrimaryButton