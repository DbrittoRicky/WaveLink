/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCreateChannelModal } from "../store/use-create-channel-modal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useCreateChannel } from "../api/use-create-channel"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const CreateChannelModal = () => {
    const router = useRouter()
    const workspaceId = useWorkspaceId()
    const[open, setOpen] = useCreateChannelModal()
    const [name, setName] = useState("")

    const {mutate, isPending} = useCreateChannel()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, "-").toLowerCase()
        setName(value)
    }

    const handleClose = () => {
        setName("")
        setOpen(isPending)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        mutate (
            {name, workspaceId},
            {
                onSuccess: (id) => {
                    router.push(`/workspace/${workspaceId}/channel/${id}`)
                    toast.success("Channel Created!")
                    handleClose()
                },

                onError: () => {
                    toast.error("Failed to create channel")
                }
            }
        )

    }

    return(
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="text-black bg-white">
                <DialogHeader>
                    <DialogTitle>
                        Add a Channel
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input value={name} disabled={isPending} onChange={handleChange} required autoFocus minLength={3} maxLength={80} placeholder="Channel name" className="bg-white"/>
                    <div className="flex justify-end">
                        <Button disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}