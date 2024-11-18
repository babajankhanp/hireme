"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, formSchema } from "./_lib/application-lib";

import { useToast } from "@/components/ui/use-toast";
import { DynamicForm } from "./_components/dynamic-form";

export default function CreateApplications() {
    const router = useRouter();
    const { toast } = useToast();
    const createApplication = useMutation(api.applications.createApplication);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await createApplication({
                ...values
            });
            
            if (res) {
                toast({
                    title: "Success",
                    description: "Application has been created.",
                    variant: "success",
                });
                router.push("/tracker");
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Unable to create your application.",
                variant: "destructive",
            })
        }
    }
    return (
        <DynamicForm 
            form={form} 
            router={router}
            onSubmit={onSubmit} 
            isLoading={isLoading}
            buttonName={isLoading ? "Loading..." : "Submit"}
            formHeading="Start Tracking Your Job Application" 
            formSubheading="Fill out the details of the job you've applied to." 
        />
    )
}