"use client"

import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
    Eye,
    Loader2,
    CirclePlus,  
} from "lucide-react";

import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";


const formSchema = z.object({
    notes: z.string().min(2)
});

type AddNotesModalProps = {
    notes: string;
    company: string;
    jobTitle: string;
    applicationId: Id<"applications">;
}

export const AddNotesModal = ({
    notes,
    company,
    jobTitle,
    applicationId
}: AddNotesModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
    const takeNotes = useMutation(api.applications.takeNotes);

    useEffect(() => {
        form.reset({
            notes: notes || ""
        })
    }, [notes])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            notes: notes || ""
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await takeNotes({
                applicationId,
                ...values
            })

            toast({
                    title: "Success",
                    description: `Notes has been added to your ${jobTitle} for ${company} application.`,
                    variant: "success",
            });

            setIsOpen(false);
            
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: `Failed to add notes on your ${jobTitle} for ${company} application.`,
                variant: "default",
            })
        }
    }
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open)
                form.reset();
            }}
        >
            <DialogTrigger asChild>
                {!notes ? (
                    <p className="cursor-pointer flex items-center text-nowrap dark:text-neutral-300  text-neutral-700 "><CirclePlus className="h-4 w-5 mr-1" />Add Notes</p>
                ) : (
                    <p className="cursor-pointer flex items-center text-nowrap dark:text-neutral-300 text-neutral-700 "><Eye className="h-4 w-4 mr-1" />Show Notes</p>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-full dark:bg-neutral-950 dark:border-white/[0.2] bg-neutral-100 border-black/[0.2]">
                <DialogHeader>
                    <DialogTitle className="dark:text-white text-neutral-800 capitalize">Application for {company} as {jobTitle}</DialogTitle>
                    <DialogDescription className="dark:text-neutral-200 text-neutral-600">Keep track of important details and decisions.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Notes</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="List action items and next steps..." className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-white border-black/[0.2]"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-x-2 mt-2">
                            <Button 
                                size="sm"
                                type="button" 
                                variant="ghost"  
                                disabled={isLoading} 
                                className="translate-hover"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button 
                                size="sm" 
                                disabled={isLoading} 
                                className="dark:bg-neutral-900 dark:text-neutral-300 text-neutral-700 hover:bg-neutral-800 translate-hover"
                            >
                                {isLoading ? (
                                    <p className="flex items-center gap-x-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Loading...
                                    </p>
                                ) : (
                                    <p>{notes ? "Save Changes" : "Submit"}</p>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}