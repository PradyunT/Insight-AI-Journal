import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const prompts = ["1 prompt", "3 prompts", "5 prompts"];

const topics = ["productivity", "mental health", "happiness", "goals"];

const InspirationDialog = ({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [customTopic, setCustomTopic] = useState("");

  const handleSelectPrompt = (prompt: string) => {
    onSelectPrompt(prompt);
    // setOpen(false);
  };

  const handleCustomPromptSubmit = () => {
    if (customPrompt.trim()) {
      onSelectPrompt(`Generate ${customPrompt} journal prompts`);
      setCustomPrompt("");
      // setOpen(false);
    }
  };

  const handleCustomTopicSubmit = () => {
    if (customTopic.trim()) {
      onSelectPrompt(`Generate a journal prompt about ${customTopic}`);
      setCustomTopic("");
      // setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Prompts</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Try these powerful prompts</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="p2" variant="outline">
                Generate <p className="font-bold mx-1">#</p> prompts
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {prompts.map((prompt, index) => (
                <DropdownMenuItem key={index} onClick={() => handleSelectPrompt(`Generate ${prompt}`)}>
                  {prompt}
                </DropdownMenuItem>
              ))}
              <div className="flex p-1">
                <Input
                  placeholder="Or Enter number"
                  value={customPrompt}
                  type="number"
                  onChange={(e) => setCustomPrompt(e.target.value)}
                />
                <Button className="p2 ml-2" variant="outline" onClick={handleCustomPromptSubmit}>
                  Submit
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="p2" variant="outline">
                Generate a journal prompt about <p className="font-bold mx-1">...</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {topics.map((topic, index) => (
                <DropdownMenuItem key={index} onClick={() => handleSelectPrompt(`Generate a journal prompt about ${topic}`)}>
                  {topic}
                </DropdownMenuItem>
              ))}
              <div className="flex p-1">
                <Input placeholder="Or Enter topic" value={customTopic} onChange={(e) => setCustomTopic(e.target.value)} />
                <Button className="p2 ml-2" variant="outline" onClick={handleCustomTopicSubmit}>
                  Submit
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default InspirationDialog;
