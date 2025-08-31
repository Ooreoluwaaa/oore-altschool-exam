/// <reference types="vite/client" />

// Add image module declarations
declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export { src };
}

declare module "*.jpg" {
  const src: string;
  export { src };
}

declare module "*.jpeg" {
  const src: string;
  export { src };
}

declare module "*.png" {
  const src: string;
  export { src };
}

declare module "*.gif" {
  const src: string;
  export { src };
}

declare module "*.webp" {
  const src: string;
  export { src };
}

declare module "*.ico" {
  const src: string;
  export { src };
}