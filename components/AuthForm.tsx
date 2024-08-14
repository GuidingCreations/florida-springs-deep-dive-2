"use client";

// imports

import { AuthFormProps } from "@/types";
import React from "react";
import Logo from "./Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/actions/user.action";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import AlertComponent from "./AlertComponent";
import Link from "next/link";
import { authFormSchema } from "@/lib/utils";

// establish form schema

// Component

const AuthForm = (props: AuthFormProps) => {
  // Init router and form
  const router = useRouter();
  const formSchema = authFormSchema(props.type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // establish states

  const [isLoading, setIsLoading] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  // handle form submission

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Values ", values);
    setIsLoading(true);

    console.log("Is loading ", isLoading);
    console.log('bool', props.type === 'sign-up')
    if (props.type === "sign-up") {
      try {
        console.log("values ", values);

        // User data

        const userData = {
          email: values.email,
          password: values.password,
          firstName: values.firstName!,
          lastName: values.lastName!,
          dateOfBirth: values.dateOfBirth!,
        };

        console.log("attempt to sign up");

        // Attempt to sign up

        const signUpResponse = await signUp(userData);

        if (signUpResponse.responseCode === 200) {
          console.log("Response code 200");
          setIsLoading(false);
          console.log("Is loading", isLoading);
          console.log("Attempt to route to home");
          router.push("/");
          console.log("Routed to home");
        } else {
          console.log("Response code not 200");
          setShowError(true);
          setErrorMessage(signUpResponse.error);
          setIsLoading(false);
        }

        // error handling
      } catch (error) {
        console.error("Error", error);
      }
    } 


    if (props.type === 'sign-in') {
      try {
        console.log("attempt to sign in");
        const signInResponse = await signIn({email: values.email, password: values.password});

        if (signInResponse.response === 200) {
          console.log("Successful sign in");
          router.push("/");
          setIsLoading(false);
        } else {
          setShowError(true);
          setErrorMessage(signInResponse.error.response.message);
          setIsLoading(false);
        }


      } catch (error) {
        setShowError(true);
        setErrorMessage("Invalid email or password");
        setIsLoading(false);
      }
    }
  
  }
  // Return JSX

  return (
    <section className="center flex flex-col">
      {showError ? (
        <AlertComponent alertMessage={errorMessage} alertType={"destructive"} />
      ) : null}

      <Logo height={35} width={35} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-3"
        >
          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email here"
                    {...field}
                    className="bg-dark-secondary"
                    autoComplete="email"
                  />
                </FormControl>

                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          ></FormField>

          {/* If form is sign-up, render additional fields */}

          {props.type === "sign-up" ? (
            <>
              {/* First name field */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name here"
                        {...field}
                        className="bg-dark-secondary"
                        autoComplete="given-name"
                      />
                    </FormControl>

                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              ></FormField>

              {/* Last name field */}

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name here"
                        {...field}
                        className="bg-dark-secondary"
                        autoComplete="family-name"
                      />
                    </FormControl>

                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              ></FormField>

              {/* Date of birth field */}

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Date of birth (YYYY-MM-DD)`}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your date of birth here"
                        {...field}
                        className="bg-dark-secondary"
                        type="string"
                        autoComplete="date-of-birth"
                      />
                    </FormControl>

                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              ></FormField>
            </>
          ) : null}

          {/* Password field */}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password here"
                    {...field}
                    className="bg-dark-secondary"
                    type="password"
                    autoComplete="current-password"
                  />
                </FormControl>

                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          ></FormField>

          {/* Submit button */}

          <Button
            type="submit"
            className="btn btn-primary mt-1"
            disabled={isLoading}
          >
            {isLoading ? (
             <div className="flex gap-1"> <Loader2 className="animate-spin" size={20} /> Loading... </div>
            ) : props.type === "sign-up" ? (
              "Sign up"
            ) : (
              "Sign in"
            ) 
            
            }

          </Button>
        </form>
      </Form>

      {props.type === "sign-up" ? (
        <div className="flex gap-1">
          <p>Already have an account? </p>
          <Link href="/sign-in" className="underline">
            <p>Sign in here</p>
          </Link>
        </div>
      ) : null}
    </section>
  );
};

export default AuthForm;
