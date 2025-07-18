"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { ForgotPasswordModal } from "@/components/auth";
import Image from "next/image";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("/api/login", formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    } catch (err: unknown) {
      let message = "Login failed. Please try again.";
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
      ) {
        // @ts-expect-error: TypeScript can't infer the structure of err
        message = err.response.data.message || message;
      }
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Image */}
      <div className="hidden md:flex w-1/2 h-screen relative bg-gray-100">
        <Image
          src="/images/login_screen.png"
          alt="Login Illustration"
          fill
          className="object-contain"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8 flex flex-col items-center">
            <Image
              width={100}
              height={100}
              src="/images/dream_aura_logo.png"
              alt="Login Illustration"
              className="rounded-full mb-4"
              style={{ width: "80px", height: "80px" }}
            />
          </div>

          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    required
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(true)}
                    className="font-medium text-violet-600 hover:text-violet-500 cursor-pointer"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-700 hover:bg-violet-700 text-white py-2 rounded-lg font-medium text-lg cursor-pointer transition-colors duration-200"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-violet-600 hover:text-violet-500 font-medium"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />
    </div>
  );
}
