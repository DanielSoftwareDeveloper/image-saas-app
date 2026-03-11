"use client";

import { Download, ImageIcon, Loader2, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  generateImage as generateImageAction,
  getUserImageProjects,
} from "@/actions/text-to-image";
import { toast } from "sonner";

import ImageSettings from "@/components/dashboard/create-images/image-settings";
import PromptInput from "@/components/dashboard/create-images/prompt-input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

export default function CreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [numInferenceSteps, setNumInferenceSteps] = useState(9);
  const [guidanceScale, setGuidanceScale] = useState(0);
  const [seed, setSeed] = useState("");
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const [, projectsResult] = await Promise.all([
          authClient.getSession(),
          getUserImageProjects(),
        ]);

        if (projectsResult.success && projectsResult.imageProjects) {
          const mappedProjects = projectsResult.imageProjects.map(
            (project) => ({
              s3_key: project.s3Key,
              imageUrl: project.imageUrl,
              prompt: project.prompt,
              negativePrompt: project.negativePrompt,
              width: project.width,
              height: project.height,
              numInferenceSteps: project.numInferenceSteps,
              guidanceScale: project.guidanceScale,
              seed: project.seed,
              modelId: project.modelId,
              timestamp: new Date(project.createdAt),
            }),
          );

          setGeneratedImages(mappedProjects);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing data:", error);
        setIsLoading(false);
      }
    };

    void initializeData();
  }, []);

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt!");
      return;
    }

    setIsGenerating(true);

    try {
      const result = await generateImageAction({
        prompt,
        negative_prompt: negativePrompt.trim()
          ? negativePrompt.trim()
          : undefined,
        width,
        height,
        num_inference_steps: numInferenceSteps,
        guidance_scale: guidanceScale,
        seed: seed.trim() ? parseInt(seed, 10) : undefined,
      });

      if (!result.success || !result.imageUrl || !result.s3_key) {
        throw new Error(result.error ?? "Generation failed");
      }

      router.refresh();

      const newImage: GeneratedImage = {
        s3_key: result.s3_key,
        imageUrl: result.imageUrl,
        prompt,
        negativePrompt: negativePrompt.trim() ? negativePrompt.trim() : null,
        width,
        height,
        numInferenceSteps,
        guidanceScale,
        seed: result.seed ?? (seed.trim() ? parseInt(seed, 10) : 0),
        modelId: result.modelId ?? "Tongyi-MAI/Z-Image-Turbo",
        timestamp: new Date(),
      };

      setCurrentImage(newImage);
      setGeneratedImages([newImage, ...generatedImages].slice(0, 20));

      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Generation error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate image";

      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      {/* PANEL IZQUIERDO */}
      <div className="bg-muted/30 flex w-full lg:w-96 shrink-0 flex-col border-b lg:border-b-0 lg:border-r">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            negativePrompt={negativePrompt}
            setNegativePrompt={setNegativePrompt}
            currentImage={currentImage}
            onDownload={(img) => window.open(img.imageUrl, "_blank")}
          />

          <Separator />

          <ImageSettings
            prompt={prompt}
            width={width}
            setWidth={setWidth}
            height={height}
            setHeight={setHeight}
            numInferenceSteps={numInferenceSteps}
            setNumInferenceSteps={setNumInferenceSteps}
            guidanceScale={guidanceScale}
            setGuidanceScale={setGuidanceScale}
            seed={seed}
            setSeed={setSeed}
            isGenerating={isGenerating}
            onGenerate={generateImage}
          />
        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="flex-1 flex flex-col p-4 lg:p-6">
        <div className="flex-1 flex items-center justify-center">
          {!currentImage && (
            <div className="flex flex-col justify-center items-center gap-4">
              <ImageIcon size={60} className="text-muted-foreground" />
            </div>
          )}

          {currentImage && (
            <div className="max-w-2xl w-full space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold">Latest Generation</h4>

                <Button
                  onClick={() => window.open(currentImage.imageUrl, "_blank")}
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">
                {currentImage.prompt}
              </p>

              <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
                <Image
                  src={currentImage.imageUrl}
                  alt={currentImage.prompt}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
