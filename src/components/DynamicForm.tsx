import { useState } from 'react';
import { FormField, FormSection, FormSchema } from '@/types/form';
import { validateField } from '@/lib/validation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DynamicFormProps {
  schema: FormSchema;
  onSubmit: (data: any) => void;
}

export function DynamicForm({ schema, onSubmit }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const renderField = (field: FormField) => {
    const error = errors[field.id];

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={error ? 'border-red-500' : ''}
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div className="space-y-2">
            <Label>{field.label}</Label>
            <Select
              value={formData[field.id] || ''}
              onValueChange={(value) => handleFieldChange(field.id, value)}
            >
              <SelectTrigger className={error ? 'border-red-500' : ''}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={formData[field.id] || false}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
            />
            <Label htmlFor={field.id}>{field.label}</Label>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={error ? 'border-red-500' : ''}
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderSection = (section: FormSection) => {
    return (
      <Card key={section.id} className="mb-6">
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {section.fields.map((field) => (
            <div key={field.id}>
              {isSection(field) ? renderSection(field) : renderField(field as FormField)}
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  const isSection = (field: FormField | FormSection): field is FormSection => {
    return 'fields' in field;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    const validateFields = (fields: (FormField | FormSection)[]) => {
      fields.forEach((field) => {
        if (isSection(field)) {
          validateFields(field.fields);
        } else {
          const error = validateField(formData[field.id], field);
          if (error) {
            newErrors[field.id] = error;
            isValid = false;
          }
        }
      });
    };

    validateFields(schema.sections);
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{schema.title}</h1>
      {schema.sections.map((section) => renderSection(section))}
      <Button type="submit" className="w-full">Submit</Button>
    </form>
  );
}