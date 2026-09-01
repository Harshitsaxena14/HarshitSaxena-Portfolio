"use client";

import InteractivePortraitCard from "@/components/InteractivePortraitCard";

interface AboutPhotoSlotProps {
  photoUrl?: string;
}

export default function AboutPhotoSlot({ photoUrl = "/harshit_photo.jpg" }: AboutPhotoSlotProps) {
  return (
    <div className="w-full flex justify-center">
      <InteractivePortraitCard photoUrl={photoUrl} />
    </div>
  );
}
