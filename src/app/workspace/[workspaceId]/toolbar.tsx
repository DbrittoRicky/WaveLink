import { Button } from '@/components/ui/button'
import { useGetWorkspace } from '@/features/workspace/api/use-get-workspace'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Info, Search } from 'lucide-react'
import React from 'react'

const Toolbar = () => {
    const workspaceId = useWorkspaceId()
    const {data} = useGetWorkspace({id: workspaceId})

  return (
    <nav className='bg-gradient-to-r from-[#182848] from-10% via-[#4b6cb7] to-[#182848] flex items-center justify-between h-10 p-1.5'>
        <div className='flex-1'/>
        <div className='min-w-[280px] max-w-[642px] grow-[2] shrink'>
            <Button size="sm" className='bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2'>
                <Search className='size-4 text-white mr-2'/>
                <span className='text-xs'>Search {data?.name}</span>
            </Button>
        </div>
        <div className='ml-auto flex-1 flex items-center justify-end'>
            <Button variant="transparent" size="iconSm">
                <Info/>
            </Button>
        </div>
    </nav>
 )
}

export default Toolbar