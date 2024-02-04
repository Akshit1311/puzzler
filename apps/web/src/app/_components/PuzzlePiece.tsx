"use client";

import Image from "next/image";
import React from "react";

interface PuzzlePieceProps {
  url: string; // URL of the puzzle piece image
  size: number; // Size of the puzzle piece
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ url, size }) => {
  return (
    <div
      className="cursor-grab"
      style={{
        height: `${size}px`,
        width: `${size}px`,
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
      }}
    />
    // <Image src={url} alt="Puzzle Piece" width={size} height={size} />
  );
};

export default PuzzlePiece;
