"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface Project {
  _id: string;
  title: string;
  description: string;
  link: string;
  image?: string | null;
}

const TicketingList = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProjects(data.projects || []);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
      } else {
        alert(data.message || "Failed to delete project");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects berdasarkan search
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Bar atas: Add Project kiri, Search kanan */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <Button onClick={() => router.push("/dashboard/apps/projects/create")}>
          Add Project
        </Button>

        <div className="w-full sm:max-w-xs">
          <Input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List Projects */}
      {loading && <p>Loading projects...</p>}
      {filteredProjects.length === 0 && !loading && <p>No projects found.</p>}

      {filteredProjects.map((project) => (
        <div
          key={project._id}
          className="p-4 border rounded-md flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {project.image && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${project.image}`}
                alt={project.title}
                className="w-24 h-24 object-cover rounded-md"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p>{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {project.link}
              </a>
            </div>
          </div>

          <Button variant="error" onClick={() => handleDelete(project._id)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TicketingList;
