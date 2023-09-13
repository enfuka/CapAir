import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { CardActionArea, Grow, TableBody } from "@mui/material";
import { Container, Skeleton } from "@mui/material";
import DaySkipper from "./daySkipper";

export default function TableSkeleton() {
  return (
    <Grow in={true}>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "2vh",
          flexGrow: 1,
          alignSelf: "center",
          paddingX: { xs: "0px" },
        }}
      >
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
              padding: "0px",
              paddingY: "10px",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell className="title-cell" sx={{ paddingBottom: "0px" }}>
                <Grid container sx={{}} columnSpacing={1} columns={12}>
                  <Grid item container sm={12} xs={12}>
                    <Card
                      elevation={0}
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyItems: "center",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        width={200}
                        sx={{ fontSize: "17px" }}
                      />
                      <DaySkipper />
                    </Card>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(4).keys()].map((i) => (
              <TableRow key={i} sx={{ width: "100%" }}>
                <TableCell>
                  <Grid
                    container
                    sx={{ marginBottom: "5px" }}
                    columnSpacing={1}
                    rowSpacing={0}
                    columns={12}
                  >
                    <Grid item sm={8} xs={12}>
                      <Card
                        sx={{
                          borderRadius: {
                            xs: "4px 4px 0px 0px",
                            sm: "4px 4px 4px 4px",
                          },
                        }}
                      >
                        <CardActionArea
                          sx={{ minHeight: "116px", paddingX: "20px" }}
                        >
                          <Skeleton variant="rectangular" height={100} />
                        </CardActionArea>
                      </Card>
                    </Grid>
                    <Grid item sm={2} xs={6}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                          alignItems: "center",
                          borderRadius: {
                            xs: "0px 0px 4px 4px",
                            sm: "4px 4px 4px 4px",
                          },
                          "& .MuiButtonBase-root:hover": {
                            outline: "1px solid",
                            outlineColor: "primary.main",
                            outlineOffset: "-1px",
                          },
                        }}
                      >
                        <CardActionArea
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            alignItems: "center",
                            padding: "5px",
                            minHeight: "116px",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            width={100}
                            sx={{ fontSize: "12px" }}
                          />
                          <Skeleton
                            variant="text"
                            width={30}
                            sx={{ fontSize: "17px" }}
                          />
                          <Skeleton
                            variant="text"
                            width={100}
                            sx={{ fontSize: "12px" }}
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                    <Grid item sm={2} xs={6}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                          alignItems: "stretch",
                          borderRadius: {
                            xs: "0px 0px 4px 4px",
                            sm: "4px 4px 4px 4px",
                          },
                          "& .MuiButtonBase-root:hover": {
                            outline: "1px solid",
                            outlineColor: "primary.main",
                            outlineOffset: "-1px",
                          },
                        }}
                      >
                        <CardActionArea
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            alignItems: "center",
                            padding: "5px",
                            minHeight: "116px",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            width={100}
                            sx={{ fontSize: "12px" }}
                          />
                          <Skeleton
                            variant="text"
                            width={30}
                            sx={{ fontSize: "17px" }}
                          />
                          <Skeleton
                            variant="text"
                            width={100}
                            sx={{ fontSize: "12px" }}
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Grow>
  );
}
