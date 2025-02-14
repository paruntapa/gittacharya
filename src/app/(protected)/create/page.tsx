"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useRefetch from "@/hooks/use-refetch"
import { api } from "@/trpc/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type FormInput = {
    repoUrl: string,
    projectName: string,
    githubToken?: string,
}

const CreatePage = () => {
    const {register, handleSubmit, reset} = useForm<FormInput>()
    const createProject = api.project.createProject.useMutation()
    const refetch = useRefetch()
    function onSubmit(data: FormInput) {
        createProject.mutate({
            githubUrl: data.repoUrl,
            name: data.projectName,
            githubToken: data.githubToken
        }, {
            onSuccess: () => {
                toast.success('Project created successfully')
                refetch()
                reset()
            },
            onError: () => {
                toast.error('Failed to create Project')
            }
        })
        return true
    }
  return (
    <div className="flex items-center gap-12 h-full justify-center">
        <img src="/undraw_github.svg" className="h-40 w-auto" />
        <div>
            <div>
                <h1 className="fibt-semibold text-2xl">
                    Link your Github Repo
                </h1>
                <p className="texxt-sm text-muted-foreground">
                    Enter Url of your repository to link it to Gittacharya
                </p>
            </div>
            <div className="h-4" />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input 
                    {...register('projectName', { required: true })}
                    placeholder="Project Name"
                    required

                    />
                    <div className="h-2" />
                    <Input 
                    {...register('repoUrl', { required: true })}
                    placeholder="Github URL"
                    type="url"
                    required

                    />
                    <div className="h-2" />
                    <Input 
                    {...register('githubToken')}
                    placeholder="Github Token (Optional"

                    />
                    <div className="h-4" />
                    <Button type="submit" disabled={createProject.isPending}>
                        Create Project
                    </Button>
                </form>
            </div>

        </div>
    </div>
  )
}

export default CreatePage