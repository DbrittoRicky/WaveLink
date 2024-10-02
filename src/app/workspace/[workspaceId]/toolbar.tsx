import { Button } from '@/components/ui/button'
import { useGetWorkspace } from '@/features/workspace/api/use-get-workspace'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Info, Search } from 'lucide-react'
import React from 'react'

const Toolbar = () => {
    const workspaceId = useWorkspaceId()
    const {data} = useGetWorkspace({id: workspaceId})

  return (
    <nav className="bg-[url('/bg.jpg')] bg-cover flex items-center justify-between h-10 p-1.5 drop-shadow-lg">
        <div className='flex-1'/>
        <div className='min-w-[280px] max-w-[642px] grow-[2] shrink'>
            <Button size="sm" className="bg-accent/60 backdrop-blur-sm hover:bg-accent-25 w-full justify-start h-7 px-2 text-[#073b4c]">
                <Search className='size-4 mr-2'/>
                <span className='text-xs'>Search {data?.name}</span>
            </Button>
        </div>
        <div className='ml-auto flex-1 flex items-center justify-end'>
            <Button variant="transparent" size="iconSm" className='text-[#073b4c]'>
                <Info/>
            </Button>
        </div>
    </nav>
 )
}

export default Toolbar