"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import toast from "react-hot-toast";

interface ProfileData {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  profilePicture: string;
  latitude: number;
  longitude: number;
}

interface Passwords {
  old_password: string;
  new_password: string;
}

const ProfilePage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [step, setStep] = useState(1);
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");
const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
const [error, setError] = useState<string | null>(null);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    profilePicture: "",
    latitude: 0,
    longitude: 0,
  });

  const [passwords, setPasswords] = useState<Passwords>({
    old_password: "",
    new_password: "",
  });

  // Load user & token from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const tokenStr = localStorage.getItem("token");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserId(user.id);
        setToken(tokenStr);
      } catch {
        console.error("Invalid user JSON");
      }
    }
  }, []);

  //location lat nad long
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message); // Handle errors like permission denied          console.error('Error getting user location:', err);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

    // Update profileData with location
  useEffect(() => {
    if (location) {
      setProfileData((prev) => ({
        ...prev,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
    }
  }, [location]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data?.user) {
          const u = res.data.user;
          setProfileData((prev) => ({
            ...prev,
            name: u.name || "",
            email: u.email || "",
            address: u.address || "",
            city: u.city || "",
            state: u.state || "",
            pincode: u.pincode || "",
            phone: u.phone || "",
            profilePicture: u.profilePicture || "",
          }));
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfileData();
  }, [userId, token]);

  // Field updaters
  const handleProfileUpdate = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordUpdate = (field: keyof Passwords, value: string) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Profile update API
  const updateProfile = async () => {
    if (!userId || !token) return;

    try {
      const res = await axios.put(`/api/user/${userId}`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        toast.success("Profile updated successfully");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to update profile";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  // Password change API
  const changePassword = async () => {
    if (!userId || !token) return;
    if (!passwords.old_password || !passwords.new_password) {
      toast.error("Both old and new passwords are required");
      return;
    }
    try {
      const res = await axios.post(
        `/api/change-password/${userId}`,
        passwords,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Password updated successfully");
        setPasswords({ old_password: "", new_password: "" });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to update Password";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const uploadProfileImage = async () => {
    if (!userId || !token || !selectedImage) {
      toast.error("No image selected or user not logged in");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const res = await axios.put(`/api/user/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        toast.success("Profile image updated");
        setSelectedImage(null);
        setImagePreview("");
        setProfileData((prev) => ({
          ...prev,
          profilePicture: res.data?.user?.image || prev.profilePicture,
        }));
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to upload image");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MODAL: Place here */}
      {showEmailModal && (
       <div className="fixed inset-0 z-50 bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {step === 1 ? "Change Email Address" : "Enter OTP"}
            </h2>
            {step === 1 ? (
              <>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  New Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                  placeholder="example@email.com"
                />
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  onClick={async () => {
                    try {
                      const res = await axios.post(
                        "/api/request-email-change",
                        {
                          userId,
                          newEmail: newEmail,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      if (res.status === 200) {
                        toast.success("OTP sent to new email");
                        setStep(2);
                      }
                    } catch (err) {
                      if (axios.isAxiosError(err)) {
                        toast.error(
                          err.response?.data?.message ||
                            "Failed to request email change"
                        );
                      } else {
                        toast.error("Failed to request email change");
                      }
                    }
                  }}
                >
                  Continue
                </Button>
              </>
            ) : (
              <>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                  placeholder="123456"
                />
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
                  onClick={async () => {
                    try {
                      const res = await axios.post(
                        "/api/verify-email-change-otp",
                        {
                          userId,
                          newEmail: newEmail,
                          otp,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      if (res.status === 200) {
                        toast.success("Email updated successfully");
                        setProfileData((prev) => ({
                          ...prev,
                          email: newEmail,
                        }));
                        setShowEmailModal(false);
                        setStep(1);
                        setNewEmail("");
                        setOtp("");
                      }
                    } catch (err) {
                      if (axios.isAxiosError(err)) {
                        toast.error(
                          err.response?.data?.message || "Failed to verify OTP"
                        );
                      } else {
                        toast.error("Failed to verify OTP");
                      }
                    }
                  }}
                >
                  Verify & Update
                </Button>
              </>
            )}
            <button
              onClick={() => {
                setShowEmailModal(false);
                setStep(1);
                setNewEmail("");
                setOtp("");
              }}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Account Management */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-center text-gray-900 mb-6">
                Account Management
              </h2>

              {/* Image upload / preview */}
              <div className="relative mb-6 flex flex-col items-center justify-center">
                {/* Profile image box */}
                <div className="w-48 h-40 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={
                      imagePreview ||
                      profileData.profilePicture ||
                      "/images/default-avatar.png"
                    }
                    alt="Profile"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="ml-[120px]">
                  {/* File input */}
                  <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png, image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const validTypes = [
                          "image/jpeg",
                          "image/jpg",
                          "image/png",
                          "image/webp",
                        ];
                        if (!validTypes.includes(file.type)) {
                          toast.error("Only JPG, PNG, or WEBP images are allowed");
                          return;
                        }
                        if (file.size > 1024 * 1024) {
                          toast.error("Image size must be less than 1MB");
                          return;
                        }
                        setSelectedImage(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    className="cursor-pointer text-gray-700 hover:text-violet-500 font-medium transition-colors mt-5"
                  />
                </div>
                {/* Upload button */}
                <Button
                  variant="outline"
                  className="w-full mt-2 border-gray-300 text-gray-700 cursor-pointer"
                  onClick={uploadProfileImage}
                  disabled={!selectedImage}
                >
                  Upload Photo
                </Button>
              </div>

              {/* Password change */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Old Password
                  </label>
                  <input
                    type="password"
                    value={passwords.old_password}
                    onChange={(e) =>
                      handlePasswordUpdate("old_password", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.new_password}
                    onChange={(e) =>
                      handlePasswordUpdate("new_password", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="••••••••"
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 cursor-pointer"
                  onClick={changePassword}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Profile Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Fullname"
                  value={profileData.name}
                  onChange={(e) => handleProfileUpdate("name", e.target.value)}
                />
                <InputField
                  label="Address"
                  value={profileData.address}
                  onChange={(e) =>
                    handleProfileUpdate("address", e.target.value)
                  }
                />
                <InputField
                  label="City"
                  value={profileData.city}
                  onChange={(e) => handleProfileUpdate("city", e.target.value)}
                />
                <InputField
                  label="State"
                  value={profileData.state}
                  onChange={(e) => handleProfileUpdate("state", e.target.value)}
                />
                <InputField
                  label="Pincode"
                  value={profileData.pincode}
                  onChange={(e) =>
                    handleProfileUpdate("pincode", e.target.value)
                  }
                />
              </div>

              <div className="mt-8">
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  Contact Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <InputField label="Email" value={profileData.email} disabled />
                    <button
                      type="button"
                      onClick={() => setShowEmailModal(true)}
                      className="absolute right-3 top-9 text-blue-500 hover:text-blue-700 cursor-pointer"
                    >
                      ✏️
                    </button>
                  </div>
                  <InputField
                    label="Phone"
                    value={profileData.phone}
                    onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4 mb-4">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={updateProfile}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};


/* ------------------------------
   Reusable InputField component
--------------------------------*/
interface InputFieldProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  type = "text",
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-3 py-2 border rounded-md ${disabled
        ? "bg-gray-100 cursor-not-allowed"
        : "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        }`}
    />
  </div>
);

export default ProfilePage;
