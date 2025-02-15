"use client";

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

const AskQuestionCard = () => {
  const {project} = useProject()
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filesReferences, setFilesReferences] = useState<{fileName: string; sourceCode: string; summary: string}[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if(!project?.id) return
    e.preventDefault();
    setLoading(true);
    setOpen(true);

    const {output, filesReferences  } = await askQuestion(question, project.id)
    setFilesReferences(filesReferences)
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Image
                src={"/logo.png"}
                alt="Gittacharya"
                width={40}
                height={40}
              />
            </DialogTitle>
          </DialogHeader>
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
            <Button type="submit">Ask Gittacharya!</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;
