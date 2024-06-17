import React from "react";

const Navbar = ({ children }: { children: React.ReactElement }) => {
  return (
    <header className="md:col-span-4 w-full sticky top-0 z-10">
      {children}
    </header>
  );
};

export default Navbar;
