import { TableRowType } from "@/types/components";


export function TableRow({cpf, name, dateAdded} :TableRowType) {
  <div className="flex">
    <div>{cpf ?? null}</div>
    <div>{name ?? null}</div>
    <div>{dateAdded ?? null}</div>
  </div>
}