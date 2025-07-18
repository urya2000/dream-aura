"use client";

import React, { useState } from "react";
import { Button, Input } from "@/components/ui";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "email" | "verification";

export default function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const [step, setStep] = useState<Step>("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/request-password-reset", { email });
      toast.success("OTP sent to your email!");
      setStep("verification");
    } catch (err: unknown) {
      let message = "Failed to send OTP. Please try again.";
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
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/verify-reset-otp", {
        email,
        otp: formData.otp,
        new_password: formData.newPassword,
      });
      toast.success("Password reset successfully!");
      onClose();
      // Reset form
      setStep("email");
      setEmail("");
      setFormData({ otp: "", newPassword: "", confirmPassword: "" });
    } catch (err: unknown) {
      let message = "Failed to reset password. Please try again.";
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
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    onClose();
    // Reset form when closing
    setStep("email");
    setEmail("");
    setFormData({ otp: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === "email" ? "Forgot Password" : "Reset Password"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {step === "email" ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <p className="text-gray-600 mb-4">
              Enter your email address and we&apos;ll send you an OTP to reset
              your password.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full"
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-violet-700 hover:bg-violet-800 text-white cursor-pointer"
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerificationSubmit} className="space-y-4">
            <p className="text-gray-600 mb-4">
              We&apos;ve sent an OTP to{" "}
              <span className="font-medium">{email}</span>. Enter the OTP and
              your new password below.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OTP
              </label>
              <Input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter 6-digit OTP"
                required
                maxLength={6}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep("email")}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-violet-700 hover:bg-violet-800 text-white"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
