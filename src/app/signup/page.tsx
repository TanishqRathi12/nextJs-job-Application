"use client";

import GuestButton from "@/components/guestButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SIGNUP } from "@/gql/mutations";
import gqlClient from "@/services/gql";
import { calculatePasswordStrength } from "@/utils/password";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Shield,
  User,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Page = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "bg-red-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Very Weak";
    if (passwordStrength < 50) return "Weak";
    if (passwordStrength < 75) return "Good";
    return "Strong";
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const data = (await gqlClient.request(SIGNUP, {
        name,
        email,
        password,
      })) as {
        signup: { success: boolean; message?: string; status?: number };
      };

      if (data.signup.success) {
        router.push("/dashboard");
      } else {
        setError(data.signup.message || "Signup failed, please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 left-1/2 transform -translate-x-1/2 w-40 sm:w-80 h-40 sm:h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <header className="relative z-10 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-4 group"
            >
              <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
              <div className="flex items-center space-x-2">
                <div className="w-7 sm:w-8 h-7 sm:h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  CareerDock
                </h1>
              </div>
            </Link>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-gray-600 text-xs sm:text-sm">
                Already have an account?
              </span>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 transition-all text-xs sm:text-sm px-3 sm:px-4"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-140px)] px-2 py-2">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 rounded-full text-green-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <UserPlus className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
              Join thousands of job seekers!
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Create your account
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Start your journey to find the perfect career opportunity
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-4 sm:pb-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-center text-gray-900">
                Get Started
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-sm sm:text-base px-2">
                Create your account and unlock access to thousands of job
                opportunities
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSignup}>
              <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                {error && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-100 rounded-lg blur-sm"></div>
                    <div className="relative bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="font-medium">Error:</strong>{" "}
                          {error}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        className="pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/50 text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        className="pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/50 text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a strong password"
                        className="pl-9 sm:pl-10 pr-10 py-2.5 sm:py-3 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/50 text-sm sm:text-base"
                        onChange={handlePasswordChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" />
                        ) : (
                          <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                        )}
                      </button>
                    </div>
                    {passwordStrength > 0 && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">
                            Password strength:
                          </span>
                          <span
                            className={`text-xs font-medium ${
                              passwordStrength < 50
                                ? "text-red-600"
                                : passwordStrength < 75
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{ width: `${passwordStrength}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-1">
                        Secure Account
                      </h4>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Your data is encrypted and protected. We never share
                        your information with third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="space-y-3 sm:space-y-4 flex flex-col pt-4 sm:pt-6 px-4 sm:px-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg transform hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating account...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <UserPlus className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                      Create Account
                    </div>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center px-2">
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>

                <div className="pt-2 sm:pt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue as guest
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4">
                    <GuestButton />
                  </div>
                </div>
              </CardFooter>
            </form>
          </Card>

          {/* Success Features */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                Instant Access
              </h3>
              <p className="text-xs text-gray-600">
                Start browsing jobs immediately after signup
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                Secure Profile
              </h3>
              <p className="text-xs text-gray-600">
                Your information is protected with encryption
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <Briefcase className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                Dream Job
              </h3>
              <p className="text-xs text-gray-600">
                Find opportunities that match your skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
