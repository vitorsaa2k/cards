import { InputHTMLAttributes, ReactNode } from "react";

export interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
}

export interface TableRowType {
  cpf?: string
  name: string
  dateAdded?: string
}