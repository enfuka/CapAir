import { Box, Typography, Stack } from "@mui/material";
import LuggageIcon from "@mui/icons-material/Luggage";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export default function SectionDetails({ type }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
      }}
    >
      {type === "business" && (
        <Stack direction="row" spacing={1} alignItems="center">
          <ConfirmationNumberIcon fontSize="12px" />
          <Typography fontSize="12px">Priority Boarding</Typography>
        </Stack>
      )}
      <Stack direction="row" spacing={1} alignItems="center">
        <BusinessCenterIcon fontSize="12px" />
        <Typography fontSize="12px">1 x Carry-on</Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <RestaurantIcon fontSize="12px" />
        <Typography fontSize="12px">Meal Service</Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <LuggageIcon fontSize="12px" />
        <Typography fontSize="12px">2 x Checked Bags</Typography>
      </Stack>
    </Box>
  );
}
