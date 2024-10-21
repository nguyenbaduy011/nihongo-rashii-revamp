"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function hello() {
  return (
    <div>
      <Button
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        }}
      >
        Show Toast
      </Button>
    </div>
  );
}
