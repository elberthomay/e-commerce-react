import { ReactNode, createContext, useContext, useState } from "react";

export interface DropdownContextType {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const DropdownContext = createContext<DropdownContextType>({
  isOpen: false,
  toggleIsOpen: () => {
    return;
  },
});

function Dropdown({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen((dropdownOpen) => !dropdownOpen);
  return (
    <DropdownContext.Provider value={{ isOpen, toggleIsOpen }}>
      <div
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function Button({ body }: { body: (arg: DropdownContextType) => ReactNode }) {
  const dropdownContextValue = useContext(DropdownContext);
  return body(dropdownContextValue);
}

function Content({ children }: { children: ReactNode }) {
  const { isOpen } = useDropdown();
  return <>{isOpen ? <div>{children}</div> : null}</>;
}

export function useDropdown() {
  const value = useContext(DropdownContext);
  if (value === undefined)
    throw new Error("DropdownContext called outside scope");
  else return value;
}

Dropdown.Button = Button;
Dropdown.Content = Content;
export default Dropdown;
