import { TableRowType } from "@/types/components";


export function TableRow({cpf, name, dateAdded} :TableRowType) {
  return (
  <div className="flex items-center gap-2 border-b text-white">
    <div className="border-r-2 p-4 text-center">{name ?? null}</div>
    <div className="border-r-2 p-4 text-center">{cpf ?? null}</div>
    <div className="border-r-2 p-4 text-center">{dateAdded ?? null}</div>
  </div>
  )
}