/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCreateWorkspace } from "../api/use-create-workspace"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
  
  const CreateWorkspaceModal = () => {
    const router = useRouter()
    const [open ,setOpen] = useCreateWorkspaceModal()
    const [name, setName] = useState("")

    const { mutate, isPending, isError, isSuccess, data, error } = useCreateWorkspace();

    const handleClose = () => {
        setOpen(false)
        setName("")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      mutate({name}, {
        onSuccess(id) {
          toast.success("Workspace Created!")
          router.push(`/workspace/${id}`)
          handleClose()
        },
      })
    }

    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black">
            <DialogHeader>
                <DialogTitle>Add a Workspace</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input value={name} onChange={(e) => setName(e.target.value)} disabled={isPending} required autoFocus minLength={3} placeholder="Workspace Name" className="bg-white"/>
                <div className="flex justify-end">
                    <Button disabled={isPending}>Create</Button>
                </div>
            </form>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default CreateWorkspaceModal