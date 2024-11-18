"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { ArrowUpToLine } from "lucide-react";

import {
    Tabs,
    TabsList,
    TabsContent,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { resumeTable } from '../resume-table/resume-columns';
import { CreateDocumentModal } from "./create-document-modal";
import { ResumeDataTable } from "../resume-table/resume-data-table";
import { CoverLetterTable } from '../cover-letter-table/cover-letter-columns';
import { CoverLetterDataTable } from "../cover-letter-table/cover-letter-data-table";

export const DocumentTab = () => {
    const resumeData = useQuery(api.resume.readDocuments);
    const coverLetterData = useQuery(api.coverLetter.readDocuments);
    
    if (!resumeData || !coverLetterData) return [];

    return (
        <Tabs defaultValue="resume" >
            <section className="flex items-center justify-between mb-2 md:mb-4">
                <TabsList className="grid grid-cols-2 w-[300px] dark:bg-neutral-800 hover:dark:bg-neutral-900 transition-all">
                    <TabsTrigger value="resume" className="dark:text-white text-neutral-600">Resume</TabsTrigger>
                    <TabsTrigger value="cover-letter" className="dark:text-white text-neutral-600">Cover Letter</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <Button className="flex items-center gap-2 dark:text-white text-neutral-600 translate-hover" size="sm" variant="ghost">
                        <ArrowUpToLine className="h-4 w-4" />
                        Upload
                    </Button>
                    <CreateDocumentModal />
                </div>
            </section>
            <TabsContent value="resume">
                <ResumeDataTable columns={resumeTable} data={resumeData} />
            </TabsContent>
            <TabsContent value="cover-letter">
                <CoverLetterDataTable columns={CoverLetterTable} data={coverLetterData} />
            </TabsContent>
        </Tabs>
    )
}