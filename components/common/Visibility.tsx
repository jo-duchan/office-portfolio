import React from "react";

interface Props {
  children: React.ReactNode;
  visible: boolean;
}

function Visibility({ children, visible }: Props) {
  if (visible) {
    return children;
  }
  return null;
}

export default Visibility;
