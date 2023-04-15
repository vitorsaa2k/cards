import { ButtonType } from "@/types/components";


export function Button(props: ButtonType) {
  return <button {...props} className="w-full text-center bg-slate-500 text-white py-2 rounded-lg">{props.children}</button>
}