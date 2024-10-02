/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import VerificationInput from "react-verification-input"
import Image from 'next/image'
import React, { useEffect, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useGetWorkspaceInfo } from "@/features/workspace/api/use-get-workspace-info"
import { Loader } from "lucide-react"
import { useJoin } from "@/features/workspace/api/use-join"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const JoinPage = () => {
    const router = useRouter()
    const workspaceId = useWorkspaceId();

    const {data, isLoading} = useGetWorkspaceInfo({id: workspaceId})
    const {mutate, isPending} = useJoin()

    const isMember = useMemo(() => data?.isMember, [data?.isMember])

    useEffect(() => {
        if(isMember) {
            router.push(`/workspace/${workspaceId}`)
        }
    }, [isMember, router, workspaceId])

    const handleComplete = (value: string) => {
        mutate({workspaceId, joinCode: value}, {
            onSuccess: (id) => {
                router.replace(`/workspace/${id}`)
                toast.success(`Joined ${data?.name}`)
            },
            onError: () => {
                toast.error("Failed to join Workspace")
            }
        })
    }

    if(isLoading) {
        return (
            <div className="h-full flex items-center justify-center bg-[url('/bg.jpg')] bg-cover">
                <Loader className="size-6 animate-spin text-muted-foreground"/>
            </div>
        )
    }

  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-[url('/bg.jpg')] bg-cover p-8 rounded-lg shadow-md text-black">
            <Image src="/logo.png" alt='logo' width={100} height={100}/>
            <div className='flex flex-col gap-y-4 items-center justify-center max-w-md'>
                <div className='flex flex-col gap-y-2 items-center justify-center'>
                    <h1 className='font-bold text-2xl'>Join {data?.name}</h1>
                    <p className='text-muted-foreground text-md'>Enter the workspace join code</p>
                </div>
                <VerificationInput classNames={{
                    container: cn("flex gap-x-2", isPending && "opacity-50 cusor-not-allowed"),
                    character: "uppercase h-auto rounded-md border border-teal-200 flex items-center justify-center text-lg font-medium",
                    characterInactive: "bg-muted",
                    characterSelected: "bg-white text-black",
                    characterFilled: "bg-white text-black"
                }}
                autoFocus
                length={6}
                onComplete={handleComplete}
                />
            </div>
            <div className="flex gap-x-4">
                <Button size={"lg"} variant={"outline"} asChild>
                    <Link href="/">
                        Back to Home
                    </Link>
                </Button>
            </div>
    </div>
  )
}

export default JoinPage