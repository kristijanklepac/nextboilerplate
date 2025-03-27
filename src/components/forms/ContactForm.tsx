"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@/stores/languageStore";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function ContactForm() {
  const { t } = useTranslation();

  // Define form schema using Zod with translated messages
  const formSchema = z.object({
    name: z.string().min(2, t('form.validation.nameRequired')),
    email: z.string().email(t('form.validation.emailInvalid')),
    message: z.string().min(10, t('form.validation.messageRequired')),
  });

  type FormData = z.infer<typeof formSchema>;
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: FormData) {
    alert(JSON.stringify(data, null, 2));
    console.log("Form submitted:", data);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.name.label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form.name.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.email.label')}</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder={t('form.email.placeholder')} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.message.label')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t('form.message.placeholder')} 
                    {...field} 
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? t('form.submitting') : t('form.submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
} 