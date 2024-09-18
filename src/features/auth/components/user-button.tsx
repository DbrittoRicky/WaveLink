"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

const UserButton = () => {
  const { data, isLoading} = useCurrentUser()
  const {signOut} = useAuthActions()

  if(isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground"/>
  }

  if(!data) {
    return null
  }

  const {image, name} = data;

  const avatarFallback = name!.charAt(0).toUpperCase()

  return (
    <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none relative">
            <Avatar className="hover:opacity-75 size-10 transition">
                <AvatarImage alt={name} src={image}/>
                <AvatarFallback className="text-black">
                  {avatarFallback}
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="right" className="w-60">
            <DropdownMenuItem onClick={() => signOut()} className="h-10 bg-gradient-to-tr  from-[#E0EAFC] to-[#CFDEF3]">
              <LogOut className="size-4 mr-2" ></LogOut>
              Log Out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton