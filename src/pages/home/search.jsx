import { useTransition } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function SearchInput() {
  const [__, startTransition] = useTransition();

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, _] = useSearchParams();

  const pathname = location.pathname;

  const debouncedSearch = useDebouncedCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value && value.length > 0) {
        params.set("title", value);
      } else {
        params.delete("title");
      }

      startTransition(() => {
        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        navigate(newUrl, { replace: true });
      });
    },

    500
  );

  return (
    <form className="relative w-full flex-1 bg-inherit mt-5">
      <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />

      <Input
        name="address"
        type="search"
        placeholder="Search Address..."
        className="w-full bg-inherit border border-neon-navy pl-8 rounded-[20px] md:w-[500px] lg:w-[600px] focus:ring-0"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </form>
  );
}
