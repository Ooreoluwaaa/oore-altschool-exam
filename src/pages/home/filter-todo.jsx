import { useTransition } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function FilterTodo() {
  const [__, startTransition] = useTransition();

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, _] = useSearchParams();

  const pathname = location.pathname;

  function handleFilter(value) {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value.length > 0) {
      params.set("filter", value);
    } else {
      params.delete("filter");
    }

    startTransition(() => {
      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      navigate(newUrl, { replace: true });
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border-neon-navy bg-mother-of-pearl"
        >
          <ListFilter /> Filter
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="left"
        className="w-[150px] bg-neon-navy text-mother-of-pearl"
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <RadioGroup
              defaultValue="all"
              onValueChange={(value) => handleFilter(value)}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="all"
                  id="all"
                  className="accent-mother-of-pearl"
                />
                <Label htmlFor="all">All</Label>
              </div>

              <div className="flex items-center gap-3">
                <RadioGroupItem value="complete" id="complete" />
                <Label htmlFor="complete">Complete</Label>
              </div>

              <div className="flex items-center gap-3">
                <RadioGroupItem value="incomplete" id="incomplete" />
                <Label htmlFor="incomplete">Incomplete</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
