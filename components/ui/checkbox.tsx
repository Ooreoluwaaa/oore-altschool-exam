import * as React from "react"
import { Check } from 'lucide-react'

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", ...props }, ref) => (
    <div className="relative inline-flex">
      <input
        ref={ref}
        type="checkbox"
        className="sr-only"
        {...props}
      />
      <div className={`w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-gray-400 ${props.checked ? "bg-blue-600 border-blue-600" : "bg-white"} ${className}`}>
        {props.checked && <Check className="w-4 h-4 text-white" />}
      </div>
    </div>
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }