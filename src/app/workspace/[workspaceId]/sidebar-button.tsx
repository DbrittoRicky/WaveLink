import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react'
import React from 'react'
import { IconType } from 'react-icons/lib'

interface SidebarButtonProps {
    icon: LucideIcon | IconType;
    label: string;
    isActive?: boolean;
}

const SidebarButton = ({icon: Icon, label, isActive}: SidebarButtonProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group'>
        <Button variant="transparent" 
        className={cn(
            "size-9 p-2 group-hover:bg-accent/90",
            isActive && "bg-accent/90 backdrop-blur-sm"
            )}>
                <Icon className='size-5 text-[#073b4c] group-hover:scale-110 transition-all'/> 
        </Button>
        <span className='text-[11px] text-[#073b4c] group-hover:text-black/80'>{label}</span>
    </div>
  )
}

export default SidebarButton