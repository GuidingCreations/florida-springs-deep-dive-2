"use client";
import { AuthFormProps } from "@/types";
import React from "react";
import Logo from "./Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const AuthForm = (props: AuthFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });


  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }


  return (
    <section className="center flex flex-col">
      <Logo height={35} width={35} />
      
      <Form {...form}>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-3">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email here" {...field} className="bg-dark-secondary" autoComplete="email"/>
              </FormControl>
              
              <FormMessage className="text-red-600"/>
            </FormItem>
          )}
        >
        </FormField>

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name here" {...field} className="bg-dark-secondary" autoComplete="given-name"/>
              </FormControl>
              
              <FormMessage className="text-red-600"/>
            </FormItem>
          )}
        >
        </FormField>

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name here" {...field} className="bg-dark-secondary" autoComplete="family-name"/>
              </FormControl>
              
              <FormMessage className="text-red-600"/>
            </FormItem>
          )}
        >
        </FormField>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password here" {...field} className="bg-dark-secondary" type="password" autoComplete="current-password"/>
              </FormControl>
              
              <FormMessage className="text-red-600"/>
            </FormItem>
          )}
        >
        </FormField>

        <Button type="submit" className="btn btn-primary mt-1">Submit</Button>
      
      </form>
    
    </Form>
    
    </section>
  );
};

export default AuthForm;
