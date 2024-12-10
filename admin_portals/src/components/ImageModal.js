import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";

const ImageModal = ({ isModalOpen, closeModal, url }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader>Document</ModalHeader>
      <ModalBody>
        <img src={url} alt="document" />
      </ModalBody>
      <ModalFooter>
        <Button
          className="w-full sm:w-auto"
          layout="outline"
          onClick={closeModal}
        >
          Cancel
        </Button>
        {/* <Button className="w-full sm:w-auto">Accept</Button> */}
      </ModalFooter>
    </Modal>
  );
};

export default ImageModal;
