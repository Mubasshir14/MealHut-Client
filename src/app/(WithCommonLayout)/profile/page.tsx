/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getProfile, updateProfile } from "@/services/Profile";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import Image from "next/image";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const toastId = 'creating'
      const data = await getProfile();
      if (data.success) {
        setProfile(data.data);
        setFormData({
          name: data.data.name || "",
          phone: data.data.phone || "",
          address: data.data.address || "",
        });
      } else {
        toast.error("Failed to fetch profile", {
          id: toastId
          
        });
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { formState: { isSubmitting }, handleSubmit } = useForm();

  const onSubmit = async () => {
    setLoading(true);
 const toastId = 'creating'
    try {
     
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);

      const response = await updateProfile(formDataToSend);

      if (response?.success) {
        toast.success(response?.message || "Profile updated successfully",{
          id: toastId
          
        });
        setProfile((prev: any) => ({ ...prev, ...formData })); 
        setOpen(false);
      } else {
        toast.error(response?.message || "Failed to update profile",{
          id: toastId
          
        });
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong!",{
        id: toastId
        
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full  bg-white p-6 shadow-lg shadow-red-300 border-2 border-green-300 rounded-lg relative">
        {/* Edit Icon */}
        <button onClick={() => setOpen(true)} className="absolute top-4 right-4 text-red-400 hover:text-red-500">
          <Pencil className="w-6 h-6" />
        </button>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <Image
            src="https://github.com/shadcn.png"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-green-400"
            height={96}
            width={96}
          />
          <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">{profile?.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{profile?.email}</p>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-2 text-gray-700 dark:text-gray-300">
          <p><strong>Address:</strong> {profile?.address}</p>
          <p><strong>Phone:</strong> {profile?.phone}</p>
          <p><strong>Meal Provider:</strong> {profile?.provider ? "Yes" : "No"}</p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-lg">Edit Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring focus:ring-red-400"
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring focus:ring-red-400"
              placeholder="Phone"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring focus:ring-red-400"
              placeholder="Address"
              required
            />
            <button
              type="submit"
              className="w-full p-2 bg-red-400 text-white rounded hover:bg-red-500 transition duration-300"
              disabled={loading || isSubmitting}
            >
              {loading || isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
