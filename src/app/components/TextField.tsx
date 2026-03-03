"use client";

import * as React from "react";

type TextFieldSize = "sm" | "md" | "lg";

export type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
> & {
  label: string;
  error?: string;
  helperText?: string;
  size?: TextFieldSize;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const sizeClasses: Record<TextFieldSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-3.5 text-sm",
  lg: "h-12 px-4 text-base",
};

export function TextField({
  label,
  id,
  placeholder,
  value,
  defaultValue,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  readOnly = false,
  size = "md",
  className,
  ...props
}: TextFieldProps) {
  const autoId = React.useId();
  const inputId = id ?? `textfield-${autoId}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);
  const describedBy = hasError ? errorId : helperText ? helperId : undefined;

  return (
    <div className={cn("w-full", className)}>
      <label
        htmlFor={inputId}
        className={cn(
          "mb-1.5 block text-sm font-medium tracking-tight text-slate-900",
          disabled && "text-slate-500"
        )}
      >
        {label}
        {required && (
          <span className="ml-0.5 text-rose-600" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        id={inputId}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        aria-required={required || undefined}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        className={cn(
          "w-full rounded-lg border bg-white text-slate-900 shadow-sm",
          "transition-[border-color,box-shadow,background-color] duration-150 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-white",
          "placeholder:text-slate-400",
          "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:placeholder:text-slate-400",
          "read-only:bg-slate-50 read-only:text-slate-700",
          sizeClasses[size],
          hasError
            ? "border-rose-400 focus-visible:border-rose-500 focus-visible:ring-rose-200"
            : "border-slate-300 hover:border-slate-400 focus-visible:border-slate-500 focus-visible:ring-slate-200"
        )}
        {...props}
      />

      {hasError ? (
        <p id={errorId} className="mt-1.5 text-sm text-rose-600">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="mt-1.5 text-sm text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
