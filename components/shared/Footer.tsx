import React from "react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper  flex flex-col gap-4 p-5 text-center sm:flex-row">
        <small className="mb-2 text-base">
          Copyright <span className="text-primary">&copy;</span> 2024 | Vignesh
          Kathiresan
        </small>
      </div>
    </footer>
  );
};

export default Footer;
