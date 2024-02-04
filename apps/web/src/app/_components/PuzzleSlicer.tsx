"use client";

import React, { useEffect, useState } from "react";
import PuzzlePiece from "./PuzzlePiece";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";

interface PuzzleSlicerProps {
  imageUrl: string;
  rows: number;
  columns: number;
}

const PuzzleSlicer: React.FC<PuzzleSlicerProps> = ({
  imageUrl,
  rows,
  columns,
}) => {
  const [pieces, setPieces] = useState<string[]>([]);

  useEffect(() => {
    const sliceImage = async () => {
      const image = document.createElement("img");

      image.src = imageUrl;
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      const pieceWidth = image.width / columns;
      const pieceHeight = image.height / rows;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = pieceWidth;
      canvas.height = pieceHeight;

      const slicedPieces: string[] = [];

      for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
          ctx.clearRect(0, 0, pieceWidth, pieceHeight);
          ctx.drawImage(
            image,
            y * pieceWidth,
            x * pieceHeight,
            pieceWidth,
            pieceHeight,
            0,
            0,
            pieceWidth,
            pieceHeight,
          );
          slicedPieces.push(canvas.toDataURL());
        }
      }

      setPieces(slicedPieces);
    };

    sliceImage()
      .then(() => {
        console.log("Image sliced");
      })
      .catch((e) => {
        console.log("Error slicing image", e);
      });
  }, [imageUrl, rows, columns]);

  const onChange = (
    _sourceId: string,
    sourceIndex: number,
    targetIndex: number,
  ) => {
    const nextState = swap(pieces, sourceIndex, targetIndex);

    setPieces(nextState);
  };

  return (
    <GridContextProvider onChange={onChange}>
      <GridDropZone
        id="items"
        boxesPerRow={5}
        rowHeight={105}
        style={{ height: "515px", width: "515px" }}
      >
        {pieces.map((piece) => (
          <GridItem key={piece}>
            <PuzzlePiece url={piece} size={100} />
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  );
};

export default PuzzleSlicer;
