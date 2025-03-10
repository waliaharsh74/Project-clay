import { useState } from 'react';
import { DynamicForm } from '@/components/DynamicForm';
import { FormSchema } from '@/types/form';
import { Card, CardContent } from '@/components/ui/card';

const sampleSchema: FormSchema = {
  title: 'Job Application Form',
  sections: [
    {
      id: 'personal',
      title: 'Personal Information',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Full Name',
          placeholder: 'Enter your full name',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'Enter your email',
          required: true,
        },
        {
          id: 'phone',
          type: 'text',
          label: 'Phone Number',
          placeholder: 'Enter your phone number',
          validation: {
            pattern: '^[0-9]{10}$',
            message: 'Please enter a valid 10-digit phone number',
          },
        },
      ],
    },
    {
      id: 'education',
      title: 'Education',
      fields: [
        {
          id: 'degree',
          type: 'select',
          label: 'Highest Degree',
          required: true,
          options: [
            { label: 'High School', value: 'high_school' },
            { label: "Bachelor's", value: 'bachelors' },
            { label: "Master's", value: 'masters' },
            { label: 'PhD', value: 'phd' },
          ],
        },
        {
          id: 'university',
          type: 'text',
          label: 'University/Institution',
          placeholder: 'Enter your university name',
          required: true,
        },
        {
          id: 'graduationYear',
          type: 'number',
          label: 'Graduation Year',
          validation: {
            min: 1950,
            max: 2024,
          },
        },
      ],
    },
    {
      id: 'experience',
      title: 'Work Experience',
      fields: [
        {
          id: 'currentlyEmployed',
          type: 'checkbox',
          label: 'I am currently employed',
        },
        {
          id: 'experience',
          type: 'textarea',
          label: 'Work Experience',
          placeholder: 'Describe your work experience',
          required: true,
        },
      ],
    },
  ],
};

function App() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = (data: any) => {
    setSubmittedData(data);
    console.log('Form submitted:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <DynamicForm schema={sampleSchema} onSubmit={handleSubmit} />
        
        {submittedData && (
          <Card className="mt-8 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Submitted Data:</h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;