"use client";

import { useForm } from "@tanstack/form-core";
import { z } from "zod";

// Define form schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const form = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      // Here you would typically send the form data to your API
      console.log("Form submitted:", value);
    },
    validatorAdapter: {
      validate: async (values) => {
        const result = contactSchema.safeParse(values);
        if (!result.success) {
          return Object.fromEntries(
            result.error.errors.map((error) => [
              error.path.join("."),
              error.message,
            ])
          );
        }
        return {};
      },
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <label 
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Name
          </label>
          <input
            id="name"
            value={form.getFieldValue("name")}
            onBlur={() => form.getFieldMeta("name").isTouched = true}
            onChange={(e) => form.setFieldValue("name", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
          {form.getFieldMeta("name").errors && (
            <div className="mt-1 text-sm text-red-600 dark:text-red-400">
              {form.getFieldMeta("name").errors}
            </div>
          )}
        </div>

        <div>
          <label 
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.getFieldValue("email")}
            onBlur={() => form.getFieldMeta("email").isTouched = true}
            onChange={(e) => form.setFieldValue("email", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
          {form.getFieldMeta("email").errors && (
            <div className="mt-1 text-sm text-red-600 dark:text-red-400">
              {form.getFieldMeta("email").errors}
            </div>
          )}
        </div>

        <div>
          <label 
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Message
          </label>
          <textarea
            id="message"
            value={form.getFieldValue("message")}
            onBlur={() => form.getFieldMeta("message").isTouched = true}
            onChange={(e) => form.setFieldValue("message", e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
          {form.getFieldMeta("message").errors && (
            <div className="mt-1 text-sm text-red-600 dark:text-red-400">
              {form.getFieldMeta("message").errors}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={form.state.isSubmitting}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {form.state.isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
} 