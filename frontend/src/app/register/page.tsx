"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import Image from "next/image";
import axios from "axios";
import type { AxiosError } from "axios";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: originalValue } = e.target;
    let value = originalValue;

    // Phone → 10 digits only
    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    // Pincode → 6 digits only
    if (name === "pincode") {
      value = value.replace(/\D/g, "").slice(0, 6);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  // ✅ Validation helper
  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password) {
      return "Please fill in all required fields";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address";
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      return "Password must be at least 8 characters, include 1 uppercase & 1 special character";
    }

    return "";
  };

  const validateStep2 = () => {
    if (
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode ||
      !formData.country
    ) {
      return "Please fill in all required fields";
    }

    if (formData.phone.length !== 10) {
      return "Phone number must be 10 digits";
    }

    if (formData.pincode.length !== 6) {
      return "Pincode must be 6 digits";
    }

    return "";
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateStep1();
    if (validationError) {
      setError(validationError);
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateStep2();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/register", {
        ...formData,
        role: "user",
      });

      setStep(3);
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("/api/verify-otp", {
        email: formData.email,
        otp: otp,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      setError(
        err.response?.data?.message ||
          "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-yellow-100">
        <Image
          width={100}
          height={100}
          src="/login-illustration.svg"
          alt="Login Illustration"
          className="max-w-full h-auto"
        />
      </div>

      {/* Right Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-8 md:px-10 py-12 bg-gray-50">
        <div className="max-w-md w-full mx-auto">
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

          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= stepNumber
                          ? "bg-violet-700 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <span className="mt-2 text-xs text-gray-500">
                      {stepNumber === 1
                        ? "Basic Info"
                        : stepNumber === 2
                        ? "Address"
                        : "Verify"}
                    </span>
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 mb-6 ${
                        step > stepNumber ? "bg-violet-700" : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div>
            {step === 1 ? (
              <Step1Form
                formData={formData}
                error={error}
                handleChange={handleChange}
                handleSubmit={handleStep1Submit}
              />
            ) : step === 2 ? (
              <Step2Form
                formData={formData}
                error={error}
                loading={loading}
                handleChange={handleChange}
                handleSubmit={handleStep2Submit}
                setStep={setStep}
              />
            ) : (
              <Step3Form
                email={formData.email}
                otp={otp}
                setOtp={setOtp}
                error={error}
                loading={loading}
                handleSubmit={handleOtpSubmit}
                setStep={setStep}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Step 1 Form
interface Step1FormProps {
  formData: {
    name: string;
    email: string;
    password: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
    phone?: string;
  };
  error: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

function Step1Form({
  formData,
  error,
  handleChange,
  handleSubmit,
}: Step1FormProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create an account
        </h2>
        <p className="text-gray-600">Step 1 of 3: Basic Information</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Full name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Amélie Laurent"
        />

        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="amelie@gmail.com"
          type="email"
        />

        <InputField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          type="password"
        />

        <Button
          type="submit"
          className="w-full bg-violet-700 hover:bg-violet-600 text-white py-3 rounded-lg font-medium text-lg cursor-pointer transition-colors duration-200"
        >
          Continue
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-600">
        Have an account?{" "}
        <Link
          href="/login"
          className="text-violet-600 hover:text-violet-500 font-medium"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

// ✅ Step 2 Form
interface Step2FormProps {
  formData: {
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  error: string;
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function Step2Form({
  formData,
  error,
  loading,
  handleChange,
  handleSubmit,
  setStep,
}: Step2FormProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Address Information
        </h2>
        <p className="text-gray-600">
          Step 2 of 3: Complete your profile
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="1234567890"
          type="tel"
        />

        <InputField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Main Street"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="New York"
          />
          <InputField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="NY"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="100001"
          />
          <InputField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="USA"
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => setStep(1)}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium text-lg cursor-pointer transition-colors duration-200"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-700 hover:bg-violet-600 text-white py-3 rounded-lg font-medium text-lg cursor-pointer transition-colors duration-200"
          >
            {loading ? "Creating..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ✅ Step 3 Form
interface Step3FormProps {
  email: string;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function Step3Form({
  email,
  otp,
  setOtp,
  error,
  loading,
  handleSubmit,
  setStep,
}: Step3FormProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Verify your email
        </h2>
        <p className="text-gray-600">
          Step 3 of 3: We&apos;ve sent a 6-digit code to{" "}
          <strong>{email}</strong>
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
            Enter 6-digit code
          </label>
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="000000"
            maxLength={6}
            className="w-full text-center text-3xl tracking-widest font-mono py-4"
            required
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => setStep(2)}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium text-lg cursor-pointer transition-colors duration-200"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium text-lg disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ✅ Reusable Input Component
function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full"
      />
    </div>
  );
}
