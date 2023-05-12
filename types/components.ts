import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
}

export interface TableRowType {
  cpf?: string
  name: string
  updatedAt?: string
  status?: string
}

export interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement>{

}

export interface ModalType extends HTMLAttributes<HTMLDivElement> {
  isShowing: boolean
  toggle: () => void
}