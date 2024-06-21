import styled from "styled-components";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";
import Icons from "@/styles/iconography";
import Button from "@/components/common/Button";

export type SubmitAction = (
  e?: React.BaseSyntheticEvent<object, any, any> | undefined
) => Promise<void>;

export interface ModalProps {
  children: React.ReactNode;
  onHideModal: () => void;
  action: SubmitAction;
}

function Modal({ children, onHideModal, action }: ModalProps) {
  return (
    <Container>
      <ModalSection onSubmit={action}>
        <ModalHeadSection>
          <Title>New Collection (1/2)</Title>
          <Close onClick={onHideModal}>
            <Icons.close />
          </Close>
        </ModalHeadSection>
        <ModalBodySection>{children}</ModalBodySection>
        <ModalfootSection>
          <Button.Neutral label="Cancel" size="medium" action={onHideModal} />
          <Button.Primary label="Next" size="medium" type="submit" />
        </ModalfootSection>
      </ModalSection>
      <Dim onClick={onHideModal} />
    </Container>
  );
}

export default Modal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
`;

const ModalSection = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 448px;
  height: 440px;
  padding: 24px;
  border-radius: ${`${round.m}px`};
  background-color: ${colors.neutral[50]};
  z-index: 999;
`;

const ModalHeadSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 14px;
  border-bottom: 1px solid ${colors.neutral[200]};
`;

const Title = styled.h3`
  ${textStyles.heading3.bold};
  color: ${colors.neutral[800]};
`;

const Close = styled.button`
  width: 24px;
  height: 24px;
  border: initial;
  padding: initial;
  background-color: transparent;
  border-radius: ${`${round.s}px`};
  cursor: pointer;
  transition: 200ms ease-in-out;
  transition-property: background-color;

  & svg {
    width: 100%;
    height: 100%;

    path {
      fill: ${colors.neutral[800]};
    }
  }

  &:active {
    background-color: ${colors.neutral[100]};
  }
`;

const ModalBodySection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  padding-block: 24px;
`;

const ModalfootSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  margin-top: 24px;
`;
