import { InputType } from "@/types/components";
import {RxMagnifyingGlass} from 'react-icons/rx'
import { IconBaseProps } from "react-icons/lib/esm/iconBase";



export function Input(props:InputType) {
  return (
    <div className="w-full flex items-center bg-white border-2 py-2 text-black border-gray-400 rounded-lg">
      <label className="flex items-center gap-2">
      <div className="ml-2">
        {props.icon ?? null}
      </div>
        <input {...props} className="w-full outline-none bg-white border-gray-400 placeholder:text-gray-400"/>
        <span className="">
          <button className="" type="button">
          </button>
        </span>
      </label>
    </div>
  )
}