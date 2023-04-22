import { TableRowType } from "@/types/components";


export function TableRow({cpf, name, updatedAt, status} :TableRowType) {
  return (
  <div className="grid grid-cols-4 items-center gap-2 border-b text-white">
    <div className="border-r-2 p-4 h-full text-center">{name ?? null}</div>
    <div className="border-r-2 p-4 h-full text-center">{cpf ?? null}</div>
    <div className="border-r-2 p-4 h-full text-center">{updatedAt ?? null}</div>
    <div className="border-r-2 p-4 h-full text-center">{status ?? null}</div>
  </div>
  )
}