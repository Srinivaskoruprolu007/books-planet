"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { user } from "@/database/schema";
import ratelimit from "@/ratelimit";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return redirect("/too-fast");
  }
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "signIn Error");
    return { success: false, error: "Failed to sign in" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, universityId, universityCard, password } = params;

  // step 0 : rate limit setup using upstash
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return redirect("/too-fast");
  }

  // step 1: Check if the user already exists
  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  // step 2: Hash the password
  const hashedPassword = await hash(password, 10);

  // step 3: Create the user
  try {
    await db.insert(user).values({
      fullName,
      email,
      universityId,
      universityCard,
      password: hashedPassword,
    });
    await signInWithCredentials({ email, password });
    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.log(error, "signup error");
    return { success: false, error: "Failed to create user" };
  }
};
