import React from "react";
import { motion, MotionProps } from "framer-motion";
type Props = {
  children?: React.ReactElement;
} & React.ComponentPropsWithoutRef<"div"> &
  MotionProps;

const TooltipUser = ({ className, children, ...rest }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        transformOrigin: "top",
        transition: {
          duration: 0.3,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      className={`absolute bg-black bg-opacity-95 rounded-2xl ${className}`}
      {...rest}
    >
      <span className="w-4 h-4 -top-[6px] shadow-inner rounded-tr-md rounded-bl-md rotate-45 bg-black absolute left-[50%] translate-x-[-50%]" />
      {children}
    </motion.div>
  );
};

export default TooltipUser;
