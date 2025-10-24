"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TodoFiltersProps {
  statusFilter: "all" | "completed" | "pending"
  onStatusFilterChange: (status: "all" | "completed" | "pending") => void
}

export function TodoFilters({ statusFilter, onStatusFilterChange }: TodoFiltersProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2 bg-slate-900 text-white border border-slate-700 px-4 py-2 rounded-md font-sans font-medium hover:bg-slate-800">
          🔽 Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 z-50 bg-slate-800 text-white">
        <DropdownMenuItem
          onClick={() => onStatusFilterChange("all")}
          className={statusFilter === "all" ? "bg-blue-100" : ""}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                statusFilter === "all" ? "border-blue-600 bg-blue-600" : "border-gray-300"
              }`}
            />
            All
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onStatusFilterChange("completed")}
          className={statusFilter === "completed" ? "bg-blue-100" : ""}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                statusFilter === "completed" ? "border-blue-600 bg-blue-600" : "border-gray-300"
              }`}
            />
            Complete
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onStatusFilterChange("pending")}
          className={statusFilter === "pending" ? "bg-blue-100" : ""}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                statusFilter === "pending" ? "border-blue-600 bg-blue-600" : "border-gray-300"
              }`}
            />
            Incomplete
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}