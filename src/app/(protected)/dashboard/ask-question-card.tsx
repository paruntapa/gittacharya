"use client";

import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/use-project";
import { Output } from "ai";
import Image from "next/image";
import { useState } from "react";
import { askQuestion } from "./actions";
import { readStreamableValue } from "ai/rsc";
import CodeReference from "./code-references";
import { api } from "@/trpc/react";
import { toast } from "sonner";


const AskQuestionCard = () => {
const saveAnswer = api.project.saveAnswer.useMutation() 

  const {project} = useProject()
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filesReferences, setFilesReferences] = useState<{fileName: string; sourceCode: string; summary: string}[]>([]);
  const [ answer, setAnswer ] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAnswer('')
    setFilesReferences([])
    if(!project?.id) return
    e.preventDefault();
    setLoading(true);

    const {output, filesReferences  } = await askQuestion(question, project.id)
    setOpen(true)
    setFilesReferences(filesReferences)

    for await ( const delta of readStreamableValue(output)) {
      if (delta){
        setAnswer(ans => ans + delta)
      }
    }
    setLoading(false)
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[80vw] ">
          <DialogHeader> 
            <div className="flex items-center gap-2">
            <DialogTitle>
              <Image
                src={"/logo.png"}
                alt="Gittacharya"
                width={80}
                height={80}
              />
            </DialogTitle>
            <Button disabled={saveAnswer.isPending} variant={'outline'} onClick={() => {
              saveAnswer.mutate({
                projectId: project!.id,
                question,
                answer,
                filesReferences
              }, {
                onSuccess: ()=> {
                  toast.success('Answer saved!')
                },
                onError: ()=>{
                  toast.error('Failed to save answer')
                }
              }
            )
              }}>
                Save Answer
            </Button>

            </div>
            
          </DialogHeader>
          <div data-color-mode="light" className="overflow-hidden max-h-[70vh] " >
          <MDEditor.Markdown  source={answer} className='bg-white max-w-[70vw] !h-full max-h-[30vh] overflow-scroll '/>
          <div className="h-4"></div>
          <CodeReference filesReferences={filesReferences}/>
          </div>
          <Button type="button" onClick={() => {setOpen(false)}}>
            Close
            </Button>

        </DialogContent>
      </Dialog>
      <Card className="relative col-span-3">
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Textarea
              placeholder="Which file should I edit to change the home page?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="h-4"></div>
            <Button 
            type="submit"
            disabled={loading}>
              Ask Gittacharya!</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;
