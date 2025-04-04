import {toast} from "react-toastify"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleSuccess = (msg:any)=>{
  toast.success(msg,{
    position :'top-right'
  })
}

export const handleError = (msg:any)=>{
  toast.error(msg,{
    position :'top-right'
  })
}

