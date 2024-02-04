"use client";

import React from "react";

import { DragDropContext } from "react-beautiful-dnd";

type Props = {
  children: React.ReactNode;
};

const DragContext = (props: Props) => {
  return (
    <DragDropContext
      onBeforeCapture={() => console.log("onBeforeCapture")}
      onBeforeDragStart={() => console.log("onBeforeDragStart")}
      onDragStart={() => console.log("onDragStart")}
      onDragUpdate={() => console.log("onDragUpdate")}
      onDragEnd={() => console.log("onDragEnd")}
    >
      {props.children}
    </DragDropContext>
  );
};

export default DragContext;
