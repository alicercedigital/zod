export const inputTypes = [
  "none",
  "text",
  "number",
  "image",
  "date",
  "email",
  "password",
  "switch",
  "string-autocomplete",
  "object",
] as const;

export type InputType = (typeof inputTypes)[number];

type AutocompleteOptionsBase = {
  multiple?: boolean;
  creatable?: boolean;
};

type StringAutocompleteOptions = AutocompleteOptionsBase & {
  options?: string[];
};

type ObjectAutocompleteOptions<T extends object> = AutocompleteOptionsBase & {
  options?: T[];
  optionsLabelKey: keyof T & string;
  optionsImageSrcKey?: keyof T & string;
  optionsOrderByKey?: keyof T & string;
};

type AutocompleteOptions<T> = T extends object
  ? ObjectAutocompleteOptions<T>
  : T extends string
  ? StringAutocompleteOptions
  : never;

export type FieldConfig<T = unknown> = {
  inputType: InputType;
  label: string;
  fields?: T extends object ? { [K in keyof T]: FieldConfig<T[K]> } : never;
  ui?: {
    hidden?: { form?: boolean; table?: boolean } | boolean;
    placeholder?: string;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    maxRows?: number;
    minRows?: number;
    clearButton?: boolean;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
    autocomplete?: T extends (infer U)[]
      ? AutocompleteOptions<U>
      : T extends object
      ? ObjectAutocompleteOptions<T>
      : never;
  };
  db?: {
    name?: string;
    textIndex?: boolean;
    encrypt?: boolean;
    searchable?: boolean;
  };
};
