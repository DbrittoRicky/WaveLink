import UserButton from '@/features/auth/components/user-button'
import React from 'react'
import WorkspaceSwitcher from './workspace-switcher'
import SidebarButton from './sidebar-button'
import { Bell, Home, MessagesSquare, MoreHorizontal } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
const pathname = usePathname()

  return (
    <aside className='w-[70px] h-full flex flex-col gap-y-4 items-center pt-[9px] pb-4 bg-gradient-to-b from-[#3d72b4] to-[#3a6073] drop-shadow-md '>
        
        <WorkspaceSwitcher/>
        <SidebarButton icon={Home} label='Home' isActive={pathname.includes("/workspace")}/>
        <SidebarButton icon={MessagesSquare} label='Messages' isActive/>
        <SidebarButton icon={Bell} label='Activity' isActive/>
        <SidebarButton icon={MoreHorizontal} label='More' isActive/>
        <div className='flex flex-col items-center justify-center gap-y-3 mt-auto'>
            <UserButton/>
        </div>
    </aside>
  )
}

export default Sidebar