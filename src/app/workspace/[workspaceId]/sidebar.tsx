import UserButton from '@/features/auth/components/user-button'
import React from 'react'
import WorkspaceSwitcher from './workspace-switcher'
import SidebarButton from './sidebar-button'
import { Bell, Home, MessagesSquare, MoreHorizontal } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
const pathname = usePathname()

  return (
    <aside className="w-[70px] h-full flex flex-col gap-y-4 items-center pt-[9px] pb-4 bg-[url('/bg.jpg')] bg-cover drop-shadow-md">
        
        <WorkspaceSwitcher/>
        <SidebarButton icon={Home} label='Home' isActive={pathname.includes("/workspace")}/>
        <SidebarButton icon={MessagesSquare} label='Messages' />
        <SidebarButton icon={Bell} label='Activity' />
        <SidebarButton icon={MoreHorizontal} label='More' />
        <div className='flex flex-col items-center justify-center gap-y-3 mt-auto'>
            <UserButton/>
        </div>
    </aside>
  )
}

export default Sidebar