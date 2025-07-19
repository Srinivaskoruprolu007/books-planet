import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <main className="auth-container">
      {/* Form Section */}
      <section className="auth-form">
        <div className="auth-box">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/icons/logo.svg"
              alt="Books-Planet Logo"
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
            <h1 className="text-2xl font-semibold text-white">Books-Planet</h1>
          </div>

          {/* Auth Content */}
          <div className="space-y-6">{children}</div>
        </div>
      </section>

      {/* Illustration Section */}
      <section className="auth-illustration">
        <div className="relative h-full w-full">
          <Image
            src="/images/auth-illustration.png"
            alt="Auth illustration"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-dark-600/30" />
        </div>
      </section>
    </main>
  );
};

export default Layout;
