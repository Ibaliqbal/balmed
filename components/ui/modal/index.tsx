import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({
  open,
  setOpen,
  children,
  className,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed h-dvh w-full top-0 left-0 bg-black bg-opacity-60 z-20"
            onClick={() => setOpen(false)}
          />
          {children}
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
