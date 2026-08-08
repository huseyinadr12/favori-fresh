import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-brand-green";

export function Field({
  label,
  error,
  required,
  children,
  hint,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/80">
        {label}
        {required && <span className="text-accent-pomegranate"> *</span>}
      </span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-ink/50">{hint}</span>}
      {error && (
        <span role="alert" className="mt-1 block text-xs text-accent-pomegranate">
          {error}
        </span>
      )}
    </label>
  );
}

export function TextInput({
  invalid,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      className={cn(inputBase, invalid && "border-accent-pomegranate", className)}
      aria-invalid={invalid}
      {...props}
    />
  );
}

export function TextArea({
  invalid,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn(inputBase, "min-h-28 resize-y", invalid && "border-accent-pomegranate", className)}
      aria-invalid={invalid}
      {...props}
    />
  );
}

export function SelectInput({
  invalid,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <select
      className={cn(inputBase, "appearance-none", invalid && "border-accent-pomegranate", className)}
      aria-invalid={invalid}
      {...props}
    >
      {children}
    </select>
  );
}
