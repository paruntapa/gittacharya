'use client'

import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import useProject from "@/hooks/use-project"
import { Bot, CreditCard, LayoutDashboard, Plus, Presentation } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { redirect, usePathname, useRouter } from "next/navigation"

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Q&A',
    url: '/qa',
    icon: Bot
  },
  {
    title: 'Meetings',
    url: '/meetings',
    icon: Presentation
  },
  {
    title: 'Billing',
    url: '/billing',
    icon: CreditCard
  },
]

export const AppSidebar = ( ) => {
    const router = useRouter()
    const pathname = usePathname()
    const {open} = useSidebar()
    const {projects, projectId, setProjectId} = useProject()
    return (
        <div>
            <Sidebar collapsible="icon" variant="floating">
                <SidebarHeader>
                    <div className="flex items-center">
                        <Image src={'/logo.png'} alt="logo" width={60} height={50} />    
                        {open && (<h1 className=" text-xl font-bold text-primary/80">
                        Gittacharya
                        </h1>)}
                    </div>
                </SidebarHeader>

                <SidebarContent>

                <SidebarGroup>
                  <SidebarGroupLabel>
                  Application
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                  <SidebarMenu>
                  {items.map(item => {
                    return (
                        <SidebarMenuItem key={item.title} >
                            <SidebarMenuButton asChild >
                                <Link href={item.url} className={`${pathname === item.url && '!bg-primary !text-white'} `}>
                                <item.icon/>
                                <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                  })}
                  </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Owned Projects
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {projects?.map(project => {
                            return (
                                <SidebarMenuItem key={project.name} >
                                    <SidebarMenuButton asChild >
                                        
                                        <div onClick={()=>{
                                            setProjectId(project.id)
                                        }}>
                                            <div className={`px-2  ${project.id === projectId && 'bg-primary text-white'} cursor-pointer rounded-sm border size-6 flex items-center justify-center text-sm text-primary`}>
                                                {project.name[0]?.toUpperCase()}
                                            </div>
                                            <span className="cursor-pointer" onClick={()=>{
                                                router.push("/dashboard")
                                            }}>{project.name}</span>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}

                        <div className="h-2"></div>

                        {open && (<SidebarMenuItem>
                        <Link href={'/create'}>
                        <Button size={'sm'} variant={"outline"} className="p-2 w-fit">
                            <Plus/>
                            {open && 'Create Poject'}
                        </Button>
                        </Link>
                        </SidebarMenuItem>)}
                    </SidebarMenu>
                </SidebarGroup>
                
                </SidebarContent>
            </Sidebar>
        </div>
    )

}