"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    name: "Perumal ",
    email: "perualavinash210@gmail.com",
    address: "37/A north street annupanadi",
    city: "madurai",
    state: "Tamilnadu",
    pincode: "625009",
    phone: "6369890217",
  });

  useEffect(() => {
  const userStr = localStorage.getItem("user");
   const tokenStr = localStorage.getItem("token");
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      setUserId(user.id);
       setToken(tokenStr);
    } catch (err) {
      console.error("Invalid user JSON");
    }
  }
}, []);

useEffect(() => {
  const fetchProfileData = async () => {
    if(!userId) return;
    try {
      const res = await axios.get(`/api/user/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`, // ✅ add token to headers
        },
      });
      if (res.data) {
        setProfileData({
          name: res.data.user.name || "",
          email: res.data.user.email || "",
          address: res.data.user.address || "",
          city: res.data.user.city || "",
          state: res.data.user.state || "",
          pincode: res.data.user.pincode || "",
          phone: res.data.user.phone || "",
        });
      }
    } catch (err) {
      console.error("Error fetching profile data:", err);
    }
  };

  fetchProfileData();
}, [userId]);


  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
  });

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordUpdate = (field: string, value: string) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //profile update api

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
      // optional: redirect or refresh data
      // router.push("/"); // if you want to go to home
    }
  } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || "Failed to update profile";
    toast.error(message);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("An unknown error occurred");
  }
}
};

//change password api

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
      // Optionally reset password fields
      setPasswords({ old_password: "", new_password: "" });
    }
  } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || "Failed to update Password";
    toast.error(message);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("An unknown error occurred");
  }
}
};


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Management Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Account Management
              </h2>

              {/* Profile Picture */}
              <div className="relative mb-6">
                <div className="w-48 h-48 bg-gradient-to-br from-pink-200 to-orange-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/images/about.jpg"
                    alt="Profile"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-gray-300 text-gray-700 cursor-pointer"
                >
                  Upload Photo
                </Button>
              </div>

              {/* Password Section */}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          {/* Profile Information Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Profile Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fullname
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      handleProfileUpdate("name", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) =>
                      handleProfileUpdate("address", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Nickname */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={(e) =>
                      handleProfileUpdate("city", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={profileData.state}
                    onChange={(e) =>
                      handleProfileUpdate("state", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Display Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={profileData.pincode}
                    onChange={(e) =>
                      handleProfileUpdate("pincode", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Contact Info Section */}
              <div className="mt-8">
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  Contact Info
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (required)
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      disabled
                      onChange={(e) =>
                        handleProfileUpdate("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      phone
                    </label>
                    <input
                      type="text"
                      value={profileData.phone}
                      onChange={(e) =>
                        handleProfileUpdate("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end space-x-4 mb-4">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer" onClick={updateProfile}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
