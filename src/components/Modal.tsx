import {
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext<{
  openId: string | null;
  confirmationOpen: boolean;
  open: (id: string) => void;
  close: () => void;
  cancelClose: () => void;
  closeImmediately: () => void;
}>({
  openId: "",
  confirmationOpen: false,
  open: () => {
    return;
  },
  close: () => {
    return;
  },
  cancelClose: () => {
    return;
  },
  closeImmediately: () => {
    return;
  },
});

function Modal({
  children,
  useConfirmation = false,
}: {
  children: ReactNode;
  useConfirmation?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const open = (id: string) => {
    setOpenId(id);
    setConfirmationOpen(false);
  };
  const close = () => {
    //if confirmation window already open, or doesn't use confirmation
    if (confirmationOpen || !useConfirmation) {
      setOpenId(null);
      setConfirmationOpen(false);
    } else setConfirmationOpen(true);
  };

  const cancelClose = () => {
    setConfirmationOpen(false);
  };

  const closeImmediately = () => {
    setOpenId(null);
    setConfirmationOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        openId,
        confirmationOpen,
        open,
        close,
        cancelClose,
        closeImmediately,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Window({
  id,
  children,
  style = "overlay",
}: {
  id: string;
  children: ReactNode;
  style?: "replace" | "overlay";
}) {
  const { openId, confirmationOpen, close } = useModal();
  return createPortal(
    <>
      {openId === id && !(style === "replace" && confirmationOpen) && (
        <ModalOverlay onClick={close}>
          <StyledModal
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </StyledModal>
        </ModalOverlay>
      )}
    </>,
    document.body
  );
}

function Confirmation({ children }: { children: ReactNode }) {
  const { confirmationOpen, cancelClose: closeConfirmation } = useModal();
  return createPortal(
    <>
      {confirmationOpen && (
        <ModalOverlay onClick={closeConfirmation}>
          <StyledModal
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </StyledModal>
        </ModalOverlay>
      )}
    </>,
    document.body
  );
}

function ModalOverlay({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <Overlay
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </Overlay>
  );
}

function ModalButton({ children }: { children: ReactNode }) {
  const { close } = useModal();
  return <Button onClick={close}>{children}</Button>;
}

function Open({ id, children }: { id: string; children: ReactElement }) {
  const { open } = useModal();
  const ClonedChildren = cloneElement(children, {
    onClick: () => {
      open(id);
    },
  });
  return ClonedChildren;
}

Modal.Window = Window;
Modal.Open = Open;
Modal.Confirmation = Confirmation;

export function useModal() {
  const value = useContext(ModalContext);
  if (value === undefined) throw new Error("ModalContext used outside scope");
  else return value;
}

export default Modal;
