"use client"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import React, { useState } from 'react'
import AskQuestionCard from '../dashboard/ask-question-card'
import MDEditor from '@uiw/react-md-editor'
import CodeReference from '../dashboard/code-references'

const QAPage = () => {
  const {projectId} = useProject()
  const { data: questions } = api.project.getQuestion.useQuery({ projectId })
  const [questionIndex, setQuestionIndex] = useState(0)
  const question = questions?.[questionIndex]
  return (
    <Sheet>
      <AskQuestionCard/>
      <div className="h-4"></div>
      <h1 className='h-4 font-semibold'>Saved Questions</h1>
      <div className='h-2'></div>
      <div className="flex gap-2 flex-col">
        {questions?.map((question, index) => {
          return <React.Fragment key={question.id}>
            <SheetTrigger onClick={()=> setQuestionIndex(index)}>
              <div className='flex items-center gap-4 bg-white rounded-lg p-4 shadow border'>
                <img src={question.user.imageUrl ?? ""} className='rounded-full' alt=""  height={30} width={30}/>

                <div className='text-left flex flex-col'>
                  <div className='flex items-center gap-2'>
                    <p className='text-gray-700 line-clamp-1 text-lg font-medium'> 
                      {question.question}
                    </p>
                    <span className='text-xs text-gray-400 whitespace-nowra'>
                      {question.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <p className='text-gray-500 line-clamp-1 text-sm'>
                    {question.answer}
                  </p>
                </div>
              </div>

            </SheetTrigger>
          </React.Fragment>
        })}
      </div>

      {question && (
        <SheetContent className='sm:max-w-[80vw]'>
          <SheetHeader>
            <SheetTitle>
              {question.question}
            </SheetTitle>
            <div data-color-mode="light" className="overflow-hidden" >
            <MDEditor.Markdown source={question.answer}/>
            </div>
            <CodeReference filesReferences={(question.fileReferences ?? []) as any}/>
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  )
}

export default QAPage