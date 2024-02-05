import React, { createElement, FormHTMLAttributes, ReactElement } from "react";
import {
  DeepPartial,
  DefaultValues,
  FieldValues,
  useForm,
} from "react-hook-form";

interface IFormProps<T> {
  defaultValues?: DeepPartial<T>;
  submitFunc: (formData: T) => void;
}

export function Form<T extends FieldValues>({
  defaultValues,
  children,
  submitFunc,
  ...props
}: IFormProps<T> & {
  children: ReactElement | (ReactElement | false)[];
} & FormHTMLAttributes<HTMLFormElement>) {
  const formApi = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const { handleSubmit } = formApi;

  return (
    <form {...props} onSubmit={handleSubmit(submitFunc)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child && child.props.name
              ? createElement(child.type, {
                  ...{
                    ...child.props,
                    formApi,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
}
