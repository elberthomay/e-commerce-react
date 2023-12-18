import { cloneElement, createContext, useContext, useState } from "react";

const MenusContext = createContext<{
  openId: string | null;
  open: (id: string) => void;
  close: () => void;
  toggle: (id: string) => void;
}>({
  openId: null,
  open: (id: string) => {
    return;
  },
  close: () => {
    return;
  },
  toggle: (id: string) => {
    return;
  },
});
function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = (id: string) => setOpenId(id);
  const close = () => setOpenId(null);
  const toggle = (id: string) =>
    setOpenId((openId) => (openId === id ? null : id));
  return (
    <MenusContext.Provider value={{ openId, open, close, toggle }}>
      {children}
    </MenusContext.Provider>
  );
}

function Open({ children, id }: { children: React.ReactElement; id: string }) {
  const { toggle } = useContext(MenusContext);
  const clonedChildren = cloneElement(children, {
    onClick: () => toggle(id),
  });
  return clonedChildren;
}

function Content({ children, id }: { children: React.ReactNode; id: string }) {
  const { openId } = useContext(MenusContext);
  return <>{openId === id && children}</>;
}

export function useMenus() {
  const value = useContext(MenusContext);
  if (value === undefined) throw new Error("MenusContext called outside scope");
  else return value;
}

Menus.Open = Open;
Menus.Content = Content;

export default Menus;
