"use client";

import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/resume-store"
import { DynamicInput } from "@/components/dynamic-input";
import { BulletListTextarea } from "@/components/bullet-list-textarea";

type ProjectFormProps = {
    resumeProjects?: {
        name: string;
        role: string;
        url: string;
        date: string;
        industry: string;
        descriptions: string[];
    }[] | undefined
}

export const ProjectForm = ({ resumeProjects }: ProjectFormProps ) => {
    const { projects, setProjects, deleteForm } = useResumeStore();

    const combinedProjects = resumeProjects && resumeProjects.length > 0 ? resumeProjects : projects;

    const handleDescriptionsUpdate = (index: number, newDescriptions: string[]) => {
        setProjects(index, 'descriptions', newDescriptions);
      };
    
    return (
        <Card>
            {combinedProjects.map((project, index) => (
                <div key={index}>
                    <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <hgroup className="grid gap-2">
                                <DynamicInput
                                    id={`projectName-${index}`}
                                    type="text"
                                    labelName="Project Name & Feature"
                                    value={project.name}
                                    placeholder="Company Name | Project Feature"
                                    onChange={(e) => { setProjects(index, "name", e.target.value) }}
                                />
                            </hgroup>
                            <hgroup className="grid gap-2">
                                <DynamicInput
                                    id={`role-${index}`}
                                    type="text"
                                    labelName="Role"
                                    value={project.role}
                                    placeholder="Your Role (Lead Coder, Data Scientiest, Backend Engineer, UX Designer, etc..."
                                    onChange={(e) => { setProjects(index, "role", e.target.value) }}
                                />
                            </hgroup>
                        </div>
                        <div className="grid grid-cols-2 gap-4">

                            <hgroup className="grid gap-2">
                                <DynamicInput
                                    id={`date-${index}`}
                                    type="text"
                                    labelName="Date Created"
                                    value={project.date}
                                    placeholder="Month Year"
                                    onChange={(e) => { setProjects(index, "date", e.target.value) }}
                                />
                            </hgroup>
                            <hgroup className="grid gap-2">
                                <DynamicInput
                                    id={`industry-${index}`}
                                    type="text"
                                    labelName="Industry"
                                    value={project.industry}
                                    placeholder="Enter the industry you worked for this project..."
                                    onChange={(e) => { setProjects(index, "industry", e.target.value) }}
                                />
                            </hgroup>
                        </div>
                        <hgroup className="grid gap-2">
                                <DynamicInput
                                    id={`url-${index}`}
                                    type="url"
                                    labelName="Project URL"
                                    value={project.url}
                                    placeholder="Enter your project link..."
                                    onChange={(e) => { setProjects(index, "url", e.target.value) }}
                                />
                            </hgroup>
                        <hgroup className="grid gap-2">
                            <label htmlFor={`descriptions-${index}`} className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Descriptions</label>
                            <BulletListTextarea 
                                descriptions={project.descriptions}
                                onUpdate={(newDescriptions) => handleDescriptionsUpdate(index, newDescriptions)}
                                placeholder="Write an accomplishment statement to highlight your achievements, contributions, and skills used."
                            />
                        </hgroup>
                    </div>
                    {combinedProjects.length > 1 && (
                        <Button className="w-full mt-4" variant="destructive" size="sm" onClick={() => deleteForm(index, "projects")}>
                            Delete
                        </Button>
                    )}
                </div>
            ))}
        </Card>
    )
}