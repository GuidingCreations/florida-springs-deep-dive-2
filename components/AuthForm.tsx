"use client";

// imports

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
import { signUp } from "@/lib/actions/user.action";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";


// establish form schema

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
    .min(8, { message: "Password must be at least 8 characters long" }),
    dateOfBirth: z.string().date(),
});

// Component

const AuthForm = (props: AuthFormProps) => {

const router = useRouter();


// init form

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      dateOfBirth: ""
    },
    });

// establish isLoading state

  const [isLoading, setIsLoading] = React.useState(false);
  console.log('Is loading ', isLoading);

// handle form submission

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    setIsLoading(true);
    
    console.log('Is loading ', isLoading);

    try {

        console.log('values ', values);
        
// User data

        const userData = {
            email: values.email,
            password: values.password,
            firstName: values.firstName, 
            lastName: values.lastName,
            dateOfBirth: values.dateOfBirth
            };
    
        console.log('attempt to sign up')
        
// Attempt to sign up

        if  ( (await signUp(userData)).responseCode === 200) {
            
            console.log('Response code 200')
            setIsLoading(false); 
            console.log('Is loading', isLoading);
            console.log('Attempt to route to home');
            router.push('/');
            console.log('Routed to home');


        } else {
            console.log('Response code not 200')
        }
        
// error handling

    } catch (error) {
        console.error('Error', error);
    };
    
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
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{`Date of birth (YYYY-MM-DD)`}</FormLabel>
              <FormControl>
                <Input placeholder="Enter your date of birth here" {...field} className="bg-dark-secondary" type="string" autoComplete="date-of-birth"/>
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

        <Button type="submit" className="btn btn-primary mt-1" disabled = {isLoading}>
            {isLoading? <Loader2 className="animate-spin" size={20}/> : 'Sign Up'}
        </Button>
      
      </form>
    
    </Form>
    
    </section>
  );
};

export default AuthForm;
