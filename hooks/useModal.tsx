import { useState } from "react";
import { createPortal } from "react-dom";
import Modal, { SubmitAction } from "@/components/common/Modal";

interface ModalParams {
  children: React.ReactNode;
  action: SubmitAction;
}

function useModal() {
  const portal =
    typeof window !== "undefined" && document.getElementById("portal");
  const [show, setShow] = useState<boolean>(false);
  const [params, setParams] = useState<ModalParams>();

  const hideModal = () => setShow(false);
  const showModal = (params: ModalParams) => {
    setShow(true);
    setParams(params);
  };
  const isModal = show && portal && params;

  const modal = () => {
    if (isModal) {
      return createPortal(
        <Modal onHideModal={hideModal} action={params.action}>
          {params.children}
        </Modal>,
        portal
      );
    }
    return null;
  };

  return { modal: modal(), showModal, hideModal };
}

export default useModal;
