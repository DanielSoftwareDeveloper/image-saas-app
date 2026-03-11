"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface GeneratedImage {
  s3_key: string;
  imageUrl: string;
  prompt: string;
  negativePrompt?: string | null;
  width: number;
  height: number;
  numInferenceSteps: number;
  guidanceScale: number;
  seed: number;
  modelId: string;
  timestamp: Date;
}

interface PromptInputProps {
  prompt: string;
  setPrompt: (text: string) => void;
  negativePrompt: string;
  setNegativePrompt: (text: string) => void;
  currentImage: GeneratedImage | null;
  onDownload: (img: GeneratedImage) => void;
}

export default function PromptInput({
  prompt,
  setPrompt,
  negativePrompt,
  setNegativePrompt,
}: PromptInputProps) {
  return (
    <>
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h3 className="mb-0.5 text-sm font-bold">Prompt</h3>
          <p className="text-muted-foreground text-xs">
            Describe the image you want to generate
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A high quality product photo of a nano banana on a wooden table, studio lighting"
          maxLength={500}
          rows={8}
          className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
        />
        <input
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          placeholder="Negative prompt (optional)"
          className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
        />
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{prompt.length}/500 characters</span>
          {prompt.length > 0 && (
            <Button
              onClick={() => setPrompt("")}
              variant="ghost"
              size="sm"
              className="h-6 gap-1 px-2"
            >
              <X className="h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
