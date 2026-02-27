"use client";

import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, HandHeart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  loginSchema,
  signupSchema,
  LoginSchemaType,
  SignupSchemaType,
} from "@/lib/validators/auth";
import api from "@/lib/axios";
import { AxiosError } from "axios";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [loginData, setLoginData] = useState<LoginSchemaType>({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupSchemaType>({
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    const validation = loginSchema.safeParse(loginData);
    if (!validation.success) {
      setLoginError(validation.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/login", loginData);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.data.token);
        router.push("/dashboard");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error("Login error:", axiosError);
      setLoginError(
        axiosError.response?.data?.message ||
          "Invalid credentials. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSignupError(null);

    const validation = signupSchema.safeParse(signupData);
    if (!validation.success) {
      setSignupError(validation.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/register/donor", signupData);
      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("token", res.data.data.token);
        router.push("/dashboard");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error("Signup error:", axiosError);
      setSignupError(
        axiosError.response?.data?.message ||
          "Signup failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left Side - Hero Section */}
      <div className="relative hidden md:flex md:w-1/2 lg:w-3/5 bg-linear-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 flex-col justify-between p-10">
        <div className="flex items-center gap-2 text-green-700">
          <Heart className="h-6 w-6 fill-current" />
          <span className="text-xl font-bold">GiveFlow</span>
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-green-900 leading-tight">
            Empower Change <br /> with Every Contribution
          </h1>
          <p className="text-lg text-green-700 max-w-md">
            The modern platform for organizations to manage donations, track
            impact, and connect with donors seamlessly.
          </p>

          {/* Abstract Decoration */}
          <div className="relative mt-8 w-full max-w-md">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 right-4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="relative space-y-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-green-100 flex items-center gap-4 w-3/4">
                <div className="p-2 bg-green-100 rounded-full">
                  <HandHeart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-900">
                    Donations Today
                  </p>
                  <p className="text-xl font-bold text-green-600">$12,400</p>
                </div>
              </div>
              <div className="ml-auto bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-green-100 flex items-center gap-4 w-3/4">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Sparkles className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-900">
                    Impact Score
                  </p>
                  <p className="text-xl font-bold text-teal-600">9.8 / 10</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-green-800 opacity-70">
          © 2023 GiveFlow. All rights reserved.
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex flex-1 items-center justify-center p-6 md:p-10 bg-white dark:bg-gray-950">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center mb-6">
            <div className="flex items-center gap-2 text-green-700">
              <Heart className="h-8 w-8 fill-current" />
              <span className="text-2xl font-bold">GiveFlow</span>
            </div>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <Card className="border-0 shadow-none">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Welcome back</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loginError && (
                    <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-200 rounded-md">
                      {loginError}
                    </div>
                  )}
                  <form onSubmit={handleAuth}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
                          }
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <a
                            href="#"
                            className="text-sm text-green-600 hover:underline"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          required
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </div>
                  </form>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="border-gray-200">
                      Google
                    </Button>
                    <Button variant="outline" className="border-gray-200">
                      GitHub
                    </Button>
                  </div>
                </CardContent>
                <CardFooter />
              </Card>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <Card className="border-0 shadow-none">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Join the Cause</CardTitle>
                  <CardDescription>
                    Create your organization account to start receiving
                    donations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {signupError && (
                    <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-200 rounded-md">
                      {signupError}
                    </div>
                  )}
                  <form onSubmit={handleSignup}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Charity Inc."
                          required
                          value={signupData.name}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              name: e.target.value,
                            })
                          }
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="contact@charity.org"
                          required
                          value={signupData.email}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              email: e.target.value,
                            })
                          }
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          required
                          value={signupData.password}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              password: e.target.value,
                            })
                          }
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
                          checked={signupData.terms}
                          onCheckedChange={(checked) =>
                            setSignupData({
                              ...signupData,
                              terms: checked === true,
                            })
                          }
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{" "}
                          <a
                            href="#"
                            className="text-green-600 underline hover:text-green-700"
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="text-green-600 underline hover:text-green-700"
                          >
                            Privacy Policy
                          </a>
                          .
                        </label>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
