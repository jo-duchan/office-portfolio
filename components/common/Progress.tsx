import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import { colors } from "@/styles/primitive-tokens";
import Icons from "@/styles/iconography";

function Progress() {
  return (
    <Container>
      <Icons.progress />
    </Container>
  );
}

export default Progress;

const rotate = keyframes`
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 1100;

  & svg {
    animation: ${rotate} 2s linear infinite;
    width: 40px;
    height: 40px;
  }

  & svg circle {
    stroke: ${colors.neutral[100]};
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
    stroke-width: 5px;
  }
`;
