import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 13px;
  height: 13px;
  background-color: rgba(0, 56, 101, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  &:hover {
    z-index: 1;
  }
`;

const Marker = ({ text, onClick }) => (
  <Wrapper alt={text} onClick={onClick}>
    <Tooltip
      title={text}
      placement="top"
      arrow
      open={true}
      PopperProps={{
        disablePortal: true,
        popperOptions: {
          positionFixed: true,
          modifiers: {
            preventOverflow: {
              enabled: true,
              boundariesElement: "window", // where "window" is the boundary
            },
          },
        },
      }}
    >
      <Box></Box>
    </Tooltip>
  </Wrapper>
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;
