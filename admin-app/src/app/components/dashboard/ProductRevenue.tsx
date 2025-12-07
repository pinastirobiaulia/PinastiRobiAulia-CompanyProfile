"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Project {
  _id: string;
  title: string;
  description: string;
  link: string;
  image?: string | null;
}

const ProjectTable = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
        const data = await res.json();
        if (data.success && data.projects) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading projects...</p>;
  }

  return (
    <div className="rounded-xl shadow-xs bg-white dark:bg-darkgray pt-6 px-0 w-full">
      <div className="px-6">
        <h5 className="card-title mb-6 text-lg font-semibold">
          Our Projects
        </h5>
      </div>

      <ScrollArea className="max-h-[450px]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="ps-6">Project</TableHead>
                <TableHead>Link</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell className="whitespace-nowrap ps-6">
                    <div className="flex gap-3 items-center">
                      {project.image ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${project.image}`}
                          alt={project.title}
                          width={60}
                          height={60}
                          className="h-[60px] w-[60px] rounded-md object-cover"
                        />
                      ) : (
                        <div className="h-[60px] w-[60px] rounded-md bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                      <div className="truncate max-w-[250px]">
                        <h6 className="text-sm font-medium">{project.title}</h6>
                        <p className="text-xs text-gray-500">{project.description}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {project.link}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProjectTable;
