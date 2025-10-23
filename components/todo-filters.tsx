"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface TodoFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: "all" | "completed" | "pending"
  onStatusFilterChange: (status: "all" | "completed" | "pending") => void
}

export default function TodoFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: TodoFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search todos by title..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("all")}
          size="sm"
        >
          All
        </Button>
        <Button
          variant={statusFilter === "pending" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("pending")}
          size="sm"
        >
          Pending
        </Button>
        <Button
          variant={statusFilter === "completed" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("completed")}
          size="sm"
        >
          Completed
        </Button>
      </div>
    </div>
  )
}
