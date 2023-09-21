import { Session } from "next-auth";
import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  register?: UseFormRegister<FieldValues>
}

export interface TableRowType {
  id: string
  cpf?: string
  name: string
  updatedAt?: string
  wasDelivered?: string | boolean
}

export interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement>{

}

export interface ModalType extends HTMLAttributes<HTMLDivElement> {
  isShowing: boolean
  toggle: () => void
}

export interface UserNameType {
  session: Session
}