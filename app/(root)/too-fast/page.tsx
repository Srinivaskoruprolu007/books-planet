"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TooFastPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(30);

  // Countdown and auto-redirect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  // Animation keyframes
  useEffect((): (() => void) => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes countdown {
        from { width: 100%; }
        to { width: 0%; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-transparent">
      {/* Glassmorphism container */}
      <div className="max-w-md space-y-6 p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-lg">
        <h1 className="text-4xl font-bold text-red-400 mb-4">Whoa There!</h1>

        <div className="space-y-4">
          <p className="text-xl text-white">
            You're making requests too quickly to our Books-Planet service.
          </p>

          <p className="text-gray-300">
            To protect our community, we've temporarily limited your requests.
            Please wait a moment before trying again.
          </p>

          <div className="pt-4">
            <div className="relative pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold inline-block text-gray-400">
                  Automatic redirect in {countdown} seconds
                </span>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-800/50">
                <div
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500/80"
                  style={{
                    width: "100%",
                    animation: `countdown ${countdown + 1}s linear forwards`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            variant="outline"
            className="w-full bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/50"
            onClick={() => router.push("/")}
          >
            Return Home Now
          </Button>
          <Button
            variant="outline"
            className="w-full bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/50"
            onClick={() => router.refresh()}
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TooFastPage;
