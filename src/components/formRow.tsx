import { ReactElement, cloneElement } from "react";
import { FieldErrors } from "react-hook-form";

function FormRow({
  label,
  formErrors,
  children,
  countString,
}: {
  label: string;
  formErrors: FieldErrors;
  children: ReactElement;
  countString?: string;
}) {
  const id = children?.props?.name;
  const hasError = Boolean(formErrors && formErrors[id]);

  const clonedChildren = cloneElement(children, {
    ...children?.props,
    "data-error": hasError,
  });
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-sm text-slate-600 font-bold capitalize"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="flex flex-col gap-1">
        {clonedChildren}
        <div>
          {hasError && (
            <p className="text-red-600 text-xs">
              {formErrors[id]?.message?.toString()}
            </p>
          )}
          {countString && (
            <p className="text-sm text-slate-500 text-right ml-auto">
              {countString}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormRow;
