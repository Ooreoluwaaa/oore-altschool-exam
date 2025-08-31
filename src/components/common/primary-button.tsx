import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type Props = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export default function PrimaryButton(props:Props) {
  const { className, children, onClick } = props;

  return (
    <Button
      className={cn(
        "min-w-[80px] min-h-[30px] p-2 rounded-[10px] bg-neon-navy text-mother-of-pearl",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
