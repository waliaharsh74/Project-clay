export type FieldType = 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'textarea';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  validation?: {
    pattern?: string;
    message?: string;
    min?: number;
    max?: number;
  };
}

export interface FormSection {
  id: string;
  title: string;
  fields: (FormField | FormSection)[];
}

export interface FormSchema {
  title: string;
  sections: FormSection[];
}