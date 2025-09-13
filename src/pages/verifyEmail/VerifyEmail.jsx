import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setStatus("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_BASE || "http://localhost:4000"
          }/api/auth/verify-email?token=${token}&email=${email}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        // try parsing backend response
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          setStatus("Email verified successfully! You can now log in.");
        } else {
          setStatus(`Verification failed: ${data.message || "Unknown error"}`);
        }
      } catch (err) {
        console.error(err);
        setStatus("Server error while verifying.");
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
      <h2 className="text-xl font-semibold">{status}</h2>
      <Link
        to="/"
        className="outline-0 border-0 h-8 w-full max-w-xs rounded-lg text-white bg-[#8B9D83] mt-4
        text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out
        flex items-center justify-center"
      >
        Back to Home
      </Link>
    </div>
  );
}
