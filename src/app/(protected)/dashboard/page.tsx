"use client"

import useProject from "@/hooks/use-project";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import CommitLog from "./commit-log";
import AskQuestionCard from "./ask-question-card";
import MeetingCard from "./MeetingCard";
import ArchiveButton from "./archive-button";
// import InviteButton from "./InviteButton";
const InviteButton = dynamic(() => import('./InviteButton'), {ssr: false})
import TeamMembers from "./team-members";
import dynamic from "next/dynamic";

const DashboardPage =  () => {

  const {project} = useProject();
    
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-y-4">
        {/* github link */}
        <div className="w-fit rounded-md bg-primary px-4  py-3">
          <div className="flex items-center ">
            <span className="rounded-lg bg-black p-1.5">
          <Github className="size-6 text-white   "/>
          </span>
          <div className="ml-2">
            <p className="text-sm font-md text-white">
              This project links to {' '}
              <Link href={project?.githubUrl ?? ''} className="inline-flex items-center text-white/80 hover:underline">
              {project?.githubUrl}
              <ExternalLink className="ml-1 size-4" />
              </Link>
            </p>
          </div>
          </div>
          

        </div>

        <div className="h-4"/>
        
        <div className="flex items-center gap-4">
          <TeamMembers /> 
          <InviteButton />
          <ArchiveButton/>

        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5"> 
          <AskQuestionCard/> 
          <MeetingCard/> 

        </div>
      </div>

      <div className="mt-8" />
        <CommitLog />
    </div>
  )
}

export default DashboardPage