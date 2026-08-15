"use client";
import { LOGIN } from "@/gql/queries";
import gqlClient from "@/services/gql";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

const GuestButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGuestLogin = async () => {
    console.log("Guest login initiated");
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
    } catch (error) {
      console.error("Guest login error:", error);
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
