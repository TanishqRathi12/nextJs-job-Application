"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

const GuestButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const data = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "guest@gmail.com",
          password: "guest@12",
        }),
      });

      const result = await data.json();
      if (result.success) {
        router.push("/dashboard");
      } else {
        console.log("Guest login failed");
      }
    } catch (error) {
      console.log("Error logging in as guest", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        type="button"
        className="bg-gray-500 cursor-pointer hover:bg-gray-600"
        onClick={handleGuestLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login as Guest"}
      </Button>
    </div>
  );
};

export default GuestButton;
