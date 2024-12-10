import React, { useContext } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import { ModalContext } from "../context/modal/ModalContext";

function ModalPage() {
  const { modalState, dispatchModal } = useContext(ModalContext);

  return (
    <>
      <Modal isOpen={modalState.isModalOpen} onClose={modalState.closeModal}>
        <ModalHeader>{modalState.modalHeader}</ModalHeader>
        <ModalBody>{modalState.modalBody}</ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto bg-red-700"
            layout="outline"
            onClick={() =>
              dispatchModal({
                type: "CLOSE_MODAL",
              })
            }
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default ModalPage;
