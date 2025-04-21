"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
})

const CreatePage = () => {

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

          //toast.success(`Course ${values.title} created successfully`);
          const response = await axios.post("/api/courses", values);

          router.push(`/teacher/courses/${response.data.id}`);
          
        } catch (error : any) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            toast.error(`Server responded with ${error.response.status} error`);
          } else if (error.request) {
            // The request was made but no response was received
            toast.error("No response received from server");
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error(`Error: ${error.message}`);
          }
        }
      };
    return (
        (<div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1  className="text-2xl">
                Жаңа бағытыңызды атаңыз
                </h1>

                <p className="text-sm text-slate-600">
                Сіз өз курсыңызды қалай атаған болар едіңіз? Қорықпа, сен
                оны кейінірек өзгерте алады.
                </p>
                <Form { ...form } >
                    <form 
                        onSubmit={ form.handleSubmit(onSubmit) }
                        className="space-y-8 mt-8"
                    >
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({field }) => (
                                <FormItem>
                                    <FormLabel>
                                    Курстың атауы
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="мысалы «Жетілдірілген веб-әзірлеу»"
                                            { ...field } // spread the field props
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Бұл курста сіз не оқытасыз?
                                    </FormDescription>
                                    <FormMessage />

                                </FormItem>
                            )
                            }
                        />
                        <div className="flex items-center gap-x-2" >
                            <Link href="/teacher/courses" legacyBehavior>
                                <Button 
                                    variant="ghost"
                                    type="button"
                                >
                                    Болдырмау
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                variant = "ghost"
                            >
                                Жалғастыру
                            </Button>
                        </div>

                    </form>
                </Form>

            </div>
        </div>)
    );


}

export default CreatePage;