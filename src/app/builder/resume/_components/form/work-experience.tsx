"use client";

import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/resume-store"
import { DynamicInput } from "@/components/dynamic-input";
import { BulletListTextarea } from "@/components/bullet-list-textarea";

type WorkExperienceFormProps = {
    resumeWorkExperience?: {
        descriptions: string[];
        location: string;
        endDate: string;
        startDate: string;
        title: string;
        company: string;
    }[] | undefined
}

export const WorkExperienceForm = ({ resumeWorkExperience } : WorkExperienceFormProps) => {
    const { experiences, setExperience, deleteForm } = useResumeStore();

    const combineWorkExperience = resumeWorkExperience && resumeWorkExperience.length > 0 ? resumeWorkExperience : experiences;

    const handleDescriptionsUpdate = (index: number, newDescriptions: string[]) => {
        setExperience(index, 'descriptions', newDescriptions);
    };

    return (
        <Card>
            {combineWorkExperience.map((experience, index) => (
                <div className="space-y-4" key={index}>
                    <hgroup className="grid gap-2">
                        <DynamicInput
                            id={`projectName-${index}`}
                            type="text"
                            labelName="Company Name"
                            value={experience.company}
                            placeholder="Enter the company name..."
                            onChange={(e) => { setExperience(index, "company", e.target.value) }}
                        />
                    </hgroup>

                    <hgroup className="grid gap-2">
                        <DynamicInput
                            id={`title-${index}`}
                            type="text"
                            labelName="Job Title"
                            value={experience.title}
                            placeholder="Enter your job title..."
                            onChange={(e) => { setExperience(index, "title", e.target.value) }}
                        />
                    </hgroup>

                    <div className="grid grid-cols-2 gap-4">
                        <hgroup className="grid gap-2">
                            <DynamicInput
                                id={`startDate-${index}`}
                                type="text"
                                labelName="Start Date"
                                value={experience.startDate}
                                placeholder="Month - Year"
                                onChange={(e) => { setExperience(index, "startDate", e.target.value) }}
                            />
                        </hgroup>
                        <hgroup className="grid gap-2">
                            <DynamicInput
                                id={`endDate-${index}`}
                                type="text"
                                labelName="End Date"
                                value={experience.endDate}
                                placeholder="Month - Year | Present"
                                onChange={(e) => { setExperience(index, "endDate", e.target.value) }}
                            />
                        </hgroup>
                    </div>
                    <hgroup className="grid gap-2">
                        <DynamicInput
                            id={`location-${index}`}
                            type="text"
                            labelName="Job Location"
                            value={experience.location}
                            placeholder="Enter your job location..."
                            onChange={(e) => { setExperience(index, "location", e.target.value) }}
                        />
                    </hgroup>
                    <hgroup className="grid gap-2">
                        <label htmlFor={`descriptions-${index}`} className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Job Descriptions</label>
                        <BulletListTextarea
                            descriptions={experience.descriptions}
                            onUpdate={(newDescriptions) => handleDescriptionsUpdate(index, newDescriptions)}
                            placeholder="Write an accomplishment statement to highlight your achievements, contributions, and skills used."
                        />
                    </hgroup>
                    {combineWorkExperience.length > 1 && (
                        <Button className="w-full mt-4" variant="destructive" size="sm" onClick={() => deleteForm(index, "experience")}>
                            Delete
                        </Button>
                    )}
                </div>
            ))}
        </Card>
    )
}