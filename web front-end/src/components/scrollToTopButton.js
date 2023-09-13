import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Tooltip, Fab } from "@mui/material";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const scrollThreshold = 500;

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > scrollThreshold) {
      setVisible(true);
    } else if (scrolled <= scrollThreshold) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Tooltip title="Scroll to top" placement="left">
      <Fab
        onClick={scrollToTop}
        sx={{
          display: visible ? "flex" : "none",
          opacity: "0.8",
          position: "fixed",
          bottom: "80px",
          right: "20px",
          zIndex: "8000",
          backgroundColor: "primary.main",
          fontSize: "16px",
          color: "yellow.main",
          cursor: "pointer",
          "&:hover": { color: "primary.main" },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Tooltip>
  );
};

export default ScrollToTopButton;
