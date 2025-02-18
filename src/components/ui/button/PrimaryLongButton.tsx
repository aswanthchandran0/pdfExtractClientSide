

interface Props{
  onClick:()=>void,
  disabled:boolean
}

const PrimaryLongButton:React.FC<Props> = ({onClick,disabled})=>{
    return(
      <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center w-full h-full p-3 font-bold text-white transition-all duration-300 bg-indigo-600 rounded-lg text-md hover:bg-indigo-500">
             submit
      </button>
    )
}


export default PrimaryLongButton