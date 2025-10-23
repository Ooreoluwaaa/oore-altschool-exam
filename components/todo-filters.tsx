"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TodoFiltersProps {
  statusFilter: "all" | "completed" | "pending"
  onStatusFilterChange: (status: "all" | "completed" | "pending") => void
}

export default function TodoFilters({
  statusFilter,
  onStatusFilterChange,
}: TodoFiltersProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          ⚙️ Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onStatusFilterChange("all")}
          className={statusFilter === "all" ? "bg-blue-50" : ""}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-gray-400" />
            All
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onStatusFilterChange("completed")}
          className={statusFilter === "completed" ? "bg-blue-50" : ""}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-green-500 bg-green-500" />
            Complete
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onStatusFilterChange("pending")}
          className={statusFilter === "pending" ? "bg-blue-50" : ""}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-blue-500 bg-blue-500" />
            Incomplete
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}