"use client";

import Image from "next/image";

interface ImageProps {
  src?: string | null;
}

const Avatar: React.FC<ImageProps> = ({ src }) => {
  return (
    <div>
      <Image
        alt="Avatar"
        height={30}
        width={30}
        src={src || "/images/placeholder.jpg"}
        className="rounded-full"
      />
    </div>
  );
};

export default Avatar;
