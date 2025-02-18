import { ElementType } from "react"


interface Props {
   label:string
   name:string
   value:string
   type?: string;
   placeholder:string
   onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
   onBlur:(event:React.FocusEvent<HTMLInputElement>)=>void
   error?:string
   Icon:ElementType
}
const PrimaryInputField:React.FC<Props> = ({label,
  name,
  value,
  type = "text",
  placeholder,
  onChange,
  onBlur,
  error,
  Icon,})=>{
    return(
        <div className="flex flex-col w-full max-w-lg p-4 space-y-3 transition-shadow rounded-lg shadow-sm bg-indigo-50 ring-1 ring-slate-200 hover:shadow-md">
          <label className="text-lg font-semibold text-indigo-500">{label}</label>
          <div className="flex flex-row items-center gap-2 ">
            {
                Icon && <Icon className='text-indigo-500'/>
            }
          <input name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          type={type} className="w-full p-2 rounded-lg outline-none " />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}

export default PrimaryInputField