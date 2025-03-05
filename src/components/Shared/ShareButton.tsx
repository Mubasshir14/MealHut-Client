"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

const ShareButton = () => {
  const handleShare = () => {
     const toastId = 'creating'
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success("Link copied to clipboard!",{
        id: toastId
        
      })) 
      .catch(err => console.error("Failed to copy: ", err));
  };

  return (
    <Button variant="outline" size="icon" className="rounded-full cursor-pointer" onClick={handleShare}>
      <Share2 className="h-5 w-5 text-green-500" />
    </Button>
  );
};

export default ShareButton;
