"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AddProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !link) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized. Please login.");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("link", link);
      if (image) formData.append("image", image);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create project");

      // reset form
      setTitle("");
      setDescription("");
      setLink("");
      setImage(null);

      // redirect or reload
      router.push("/dashboard/apps/projects");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add New Project</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="link">Link</Label>
          <Input
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Project Link"
          />
        </div>

        <div>
          <Label>Image</Label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="h-full object-contain"
              />
            ) : (
              <span className="text-gray-400">Click or drop an image here</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button variant="error" onClick={() => router.push("/dashboard/apps/projects")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectForm;
