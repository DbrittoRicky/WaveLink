import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGetWorkspace } from '@/features/workspace/api/use-get-workspace'
import { useGetWorkspaces } from '@/features/workspace/api/use-get-workspaces'
import { useCreateWorkspaceModal } from '@/features/workspace/store/use-create-workspace-modal'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Loader, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const WorkspaceSwitcher = () => {
    const router = useRouter()
    const workspaceId = useWorkspaceId()
    const [_open, setOpen] = useCreateWorkspaceModal()

    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({id: workspaceId}) 
    const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces()

    const filteredWorkspaces = workspaces?.filter((workspace) => workspace?._id !== workspaceId)

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className='size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/75 text-slate-800 font-semibold text-xl '>    
                {workspaceLoading ? (
                    <Loader className='size-5 animate-spin shrink-0'/>
                ) : (
                    workspace?.name.charAt(0).toUpperCase()
                )}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className='w-64'>
                <DropdownMenuItem onClick={() => router.push(`/workspace/${workspaceId}`)} className='cursor-pointer flex-col justify-start items-start capitalize bg-gradient-to-tr from-[#E0EAFC] to-[#CFDEF3]'>
                    {workspace?.name}
                    <span className='text-xs text-muted-foreground'>Active Workspace</span>
                </DropdownMenuItem>
                {filteredWorkspaces?.map((workspace) => (
                    <DropdownMenuItem key={workspace._id} className='cursor-pointer capitalize' onClick={() => router.push(`/workspace/${workspace._id}`)}>
                        <div className='size-9 relative overflow-hidden bg-sky-100 text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2'>{workspace.name.charAt(0).toUpperCase()}</div>
                        <p className='truncate'>{workspace.name}</p>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuItem className='cursor-pointer' onClick={() => setOpen(true)}>
                    <div className='shrink-0 size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2'>
                        <Plus/>
                    </div>
                    Create a new Workspace
                </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)
}

export default WorkspaceSwitcher