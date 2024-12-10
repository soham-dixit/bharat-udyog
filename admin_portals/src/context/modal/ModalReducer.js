const ModalReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isModalOpen: true,
        // modalHeader: action.payload.modalHeader,
        // modalBody: action.payload.modalBody,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
        modalHeader: "",
        modalBody: "",
      };
    default:
      return state;
  }
};

export default ModalReducer;
