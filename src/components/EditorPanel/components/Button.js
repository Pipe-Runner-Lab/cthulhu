import React from "react";
import { clsx } from "clsx";

export function Button({ children, className, ...props }) {
  return (
    <button
      className={clsx(
        "shadow-sm bg-slate-100 p-2 flex justify-center items-center rounded-md border-solid border-gray-300 border-[1px]",
        className ? className : "h-9 w-9"
      )}
      {...props}
    >
      {children}
    </button>
  );
}
