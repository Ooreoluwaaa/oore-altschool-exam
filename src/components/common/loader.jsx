import { ScaleLoader } from "react-spinners";

import { cn } from "@/lib/utils";

export function ContentLoader({ className }) {
  return (
    <div
      className={cn(
        "w-full min-h-[400px] flex items-center justify-center bg-inherit",
        className
      )}
    >
      <ScaleLoader
        color={"#16243d"}
        loading
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export function OverlayPageLoader({ className }) {
  return (
    <div
      className={cn(
        "fixed bg-white/70 backdrop-blur-sm z-10 w-[100vw] h-[100vh] flex items-center justify-center",
        className
      )}
    >
      <ScaleLoader
        color={"#16243d"}
        loading
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export function PageLoader({ className }) {
  return (
    <div
      className={cn(
        "w-full h-[100vh] flex items-center justify-center bg-white",
        className
      )}
    >
      <ScaleLoader
        color={"#16243d"}
        loading
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
