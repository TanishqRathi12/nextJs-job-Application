"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import gqlClient from "@/services/gql";
import { LOGIN } from "@/gql/queries";

const GuestButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const data = (await gqlClient.request(LOGIN, {
        email: "guest@gmail.com",
        password: "guest@12",
      })) as { login: { success: boolean; message?: string; status?: number } };
      if (data.login.success) {
        router.push("/dashboard");
      } else {
        console.log("Guest login failed");
      }
    } catch {
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
