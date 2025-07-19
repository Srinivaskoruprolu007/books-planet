"use client";

import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import ImageUpload from "./ImageUpload";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface Props<T extends FieldValues> {
  schema: ZodType<T & FieldValues, FieldValues>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const form: UseFormReturn<FieldValues, any, T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast({
        title: "Success",
        description:
          type === "SIGN_IN"
            ? "Login successful"
            : "Account created successfully",
      });
      router.push("/");
    } else {
      toast({
        title: `Error ${type === "SIGN_IN" ? "Signing in" : "Signing up"}`,
        description: result.error ?? "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-black rounded-lg shadow-md">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          {type === "SIGN_IN"
            ? "Welcome back to Books-Planet"
            : "Create an account"}
        </h1>
        <p className="text-gray-300">
          {type === "SIGN_IN"
            ? "Sign in to your account to get started"
            : "Please enter your details to create an account"}
        </p>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
          aria-live="polite"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-white mb-1">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        placeholder={
                          FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]
                        }
                        {...field}
                        className="w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition"
                        aria-required="true"
                      />
                    )}
                  </FormControl>
                  <FormMessage className="text-sm text-red-400 mt-1" />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Processing..."
              : type === "SIGN_IN"
                ? "Sign in"
                : "Sign up"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        <p className="text-gray-300">
          {type === "SIGN_IN"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Link
            href={type === "SIGN_IN" ? "/sign-up" : "/sign-in"}
            className="font-medium text-primary hover:text-primary/80 transition-colors focus:outline-none focus:underline"
            aria-label={
              type === "SIGN_IN" ? "Go to sign up page" : "Go to sign in page"
            }
          >
            {type === "SIGN_IN" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
