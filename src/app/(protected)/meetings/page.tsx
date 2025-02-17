'use client'

import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import React from 'react'
import MeetingCard from '../dashboard/MeetingCard'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import useRefetch from '@/hooks/use-refetch'
import { Delete, Recycle, Trash, Trash2 } from 'lucide-react'

const MeetingPage = () => {
    const { projectId } = useProject()
    const { data: meetings, isLoading } = api.project.getMeetings.useQuery({ projectId }, {
        refetchInterval: 4000
    })
    const deleteMeeting = api.project.deleteMeeting.useMutation()
    const refetch = useRefetch()
    const { data: members } = api.project.getTeamMembers.useQuery({ projectId })
   

  return (
    <>
    <MeetingCard/>
    <div className="h-6"></div>
    <h1 className='text-xl font-semibold'>Meetings</h1>
    {meetings && meetings.length === 0 && <div className='text-center'>No meetings found</div>}
    {isLoading && <div className='text-center'>Loading...</div>}
    <ul className='divide-y divide-gray-200'>
        {meetings?.map(meeting => (
            <li className='flex items-center justify-between py-5 gap-x-2' key={meeting.id}>
                
                <div className='flex items-center gap-3'>
                <div className='justify-start'>
                {members?.map(member => (
                    <img key={member.id} src={member.user.imageUrl || ""} alt="" className='rounded-full size-8'/>
                )) }
                </div>
                <div>
                    <div className='min-w-0'>
                        <div className='flex items-center gap-2'>
                            <Link href={`/meetings/${meeting.id}`} className='text-sm font-medium text-gray-900 hover:text-gray-700'>
                            {meeting.name}
                            </Link>
                            {meeting.status === "PROCESSING" && (
                                <Badge className='bg-yellow-500 text-white'>
                                    Processing...

                                </Badge>
                            )}
                        </div>

                    </div>
                    <div className='flex items-center gap-x-2 text-sm text-gray-500'>
                        <p className='whitespace-nowrap'>
                            {meeting.createdAt.toLocaleDateString()}
                        </p>
                        <p className='truncate'>
                            {meeting.issues.length} Issues
                        </p>

                    </div>
                </div>
                </div>

                <div className='flex items-center flex-none gap-x-4'>
                    <Link href={`/meetings/${meeting.id}`} className='text-sm font-medium text-gray-900 hover:text-gray-700'>
                    <Button size='sm' variant={'outline'}> 
                        View Meetings

                    </Button>
                    </Link>
                    <Button disabled={deleteMeeting.isPending} size='sm' variant='destructive' onClick={() => deleteMeeting.mutate({meetingId: meeting.id},
                        {onSuccess: () => {
                            toast.success("Meeting deleted successfully")
                            refetch()
                        },
                        onError: () => {
                            toast.error("Failed to delete meeting")
                        }}
                    )}>
                        <Trash2/>
                    </Button>

                </div>
            </li>
        ))}

    </ul>
    </>
  )
}

export default MeetingPage