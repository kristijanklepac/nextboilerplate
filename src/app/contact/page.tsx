import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact Us | Next App",
  description: "Get in touch with us using our contact form",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <ContactForm />
      </div>
    </div>
  );
} 