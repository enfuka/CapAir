import { Button, ButtonGroup, Tooltip } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function DaySkipper(props) {
  const navigate = useNavigate();

  const handleClick = (direction) => {
    navigate(
      `/flights/search/${props.urlParams.type}/${props.urlParams.source}/${
        props.urlParams.destination
      }/${
        props.type === "OUTBOUND"
          ? dayjs(props.urlParams.departureDate)
              .add(direction, "day")
              .format("YYYY-MM-DD HH:mm:ss")
          : props.urlParams.departureDate
      }/${
        props.type === "INBOUND"
          ? dayjs(props.urlParams.returnDate)
              .add(direction, "day")
              .format("YYYY-MM-DD HH:mm:ss")
          : props.urlParams.returnDate
      }/${props.urlParams.passengers}`
    );
  };

  return (
    <ButtonGroup variant="outlined" size="small" sx={{ marginLeft: "15px" }}>
      <Tooltip title="Previous Day">
        <Button
          onClick={() => {
            handleClick(-1);
          }}
        >
          <ArrowBackIosIcon fontSize="small" />
          {props.mode === "noflights" ? "Previous Day" : null}
        </Button>
      </Tooltip>
      <Tooltip title="Next Day">
        <Button
          onClick={() => {
            handleClick(1);
          }}
        >
          {props.mode === "noflights" ? "Next Day" : null}
          <ArrowForwardIosIcon fontSize="small" />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}
