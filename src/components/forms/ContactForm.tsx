"use client";

import { createTsForm } from "@tanstack/react-form";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";

// Define form schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Create form components with Zod validator
const Form = createTsForm(zodValidator);

export function ContactForm() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Form
        schema={contactSchema}
        onSubmit={async (values) => {
          // Here you would typically send the form data to your API
          console.log("Form submitted:", values);
        }}
        defaultValues={{
          name: "",
          email: "",
          message: "",
        }}
        className="space-y-4"
      >
        {({ Field, handleSubmit, isSubmitting }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }}
            className="space-y-4"
          >
            <Field name="name">
              {({ state, handleChange, handleBlur }) => (
                <div>
                  <label 
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  {state.meta.errors && (
                    <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {state.meta.errors.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </Field>

            <Field name="email">
              {({ state, handleChange, handleBlur }) => (
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
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  {state.meta.errors && (
                    <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {state.meta.errors.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </Field>

            <Field name="message">
              {({ state, handleChange, handleBlur }) => (
                <div>
                  <label 
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  {state.meta.errors && (
                    <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {state.meta.errors.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </Form>
    </div>
  );
} 