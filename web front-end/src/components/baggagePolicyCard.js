import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Stack,
} from "@mui/material";
import LuggageIcon from "@mui/icons-material/Luggage";
import SectionDetails from "./sectionDetails";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export default function BaggagePolicyCard(props) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardHeader
        disableTypography
        title={
          <Stack direction="row" spacing={1} alignItems="center">
            <ConfirmationNumberIcon />
            <Typography variant="h7" sx={{}}>
              Flight Policies:
            </Typography>
          </Stack>
        }
        titleTypographyProps={{ fontSize: "20px" }}
        sx={{ paddingY: "10px!important" }}
      />
      <Divider />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <BusinessCenterIcon fontSize="12px" />
          <Typography fontSize="12px">
            1 x Carry-on bag (9in x 14in x 22in)
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <LuggageIcon fontSize="12px" />
          <Typography fontSize="12px">
            2 x Checked bags (30in x 20in x 12in) (50 lbs)
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <RestaurantIcon fontSize="12px" />
          <Typography fontSize="12px">Meal Service</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
