import { Button } from '@/components/ui/button'
import { useGetWorkspace } from '@/features/workspace/api/use-get-workspace'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Info, Search } from 'lucide-react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  
import React, { useState } from 'react'
import { useGetChannels } from '@/features/channels/api/use-get-channels'
import { useGetMembers } from '@/features/members/api/use-get-members'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Toolbar = () => {
    const router = useRouter()
    const workspaceId = useWorkspaceId()
    const {data} = useGetWorkspace({id: workspaceId})

    const onChannelClick = () => {
        setOpen(false)

        router.push(``)
    }

    const {data: channels} = useGetChannels({ workspaceId })
    const {data: members} = useGetMembers({ workspaceId })

    const [open, setOpen] = useState(false)

  return (
    <nav className="bg-[url('/bg.jpg')] bg-cover flex items-center justify-between h-10 p-1.5 drop-shadow-lg">
        <div className='flex-1'/>
        <div className='min-w-[280px] max-w-[642px] grow-[2] shrink'>
            <Button onClick={() => setOpen(true)} size="sm" className="bg-accent/60 backdrop-blur-sm hover:bg-accent-25 w-full justify-start h-7 px-2 text-[#073b4c]">
                <Search className='size-4 mr-2'/>
                <span className='text-xs'>Search {data?.name}</span>
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Channels">
            {channels?.map((channel) => (
                
                 <CommandItem key={channel._id} asChild>
                <Link href={`/workspace/${workspaceId}/channel/${channel._id}`} onClick={() => setOpen(false)}>
                 {channel.name}
                 </Link>
                 </CommandItem>
                
            ))}
           
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Members">
          {members?.map((member) => (
                <CommandItem asChild key={member._id}>
                <Link href={`/workspace/${workspaceId}/member/${member._id}`} onClick={() => setOpen(false)}>
                {member.user.name}
                </Link>
                </CommandItem>
           ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

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