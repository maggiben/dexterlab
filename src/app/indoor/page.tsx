"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFetch } from "use-http";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Dashboard from "@/containers/dashboard";
import type { IndoorSchema } from '@/models/sensor';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Indoor() {
  const [sensorStatus, setSensorStatus] = useState<IndoorSchema[]>([]);

  const searchParams = new URLSearchParams({
    timestamp: `${new Date().getTime()}`,
  });
  const { get, response } = useFetch("api");

  useEffect(() => {
    get(`/status/indoor-small`)
      .then((result) => {
        if (response.ok) {
          setSensorStatus(result.status);
        }
      })
      .catch(console.error);
  }, [response]);

  return (
    <Dashboard>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Sensor</TableCell>
                    <TableCell align="right">Temperature</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                  sensorStatus.map((row) => (
                    <TableRow
                      key={row.sensor}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.sensor}
                      </TableCell>
                      <TableCell align="right">{row.sensors.temperature}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid xs={12}>
            <Item>
              <pre style={{ textAlign: "left" }}>
                {`
RPI:
http://raspberrypi.local:8077       OMV Admin
http://raspberrypi.local:8080       qBittorrent
http://raspberrypi.local:8070       adGuard Admin
http://raspberrypi.local:9000       portainer
http://raspberrypi.local:8096       jellyfin
http://raspberrypi.local:8181       nginxproxymanager
http://raspberrypi.local:7373       dexterlab

Mercury:
http://mercury.local:8096           jellyfin
http://mercury.local:9090           Chatbot UI
http://mercury.local:8080           qBittorrent
http://mercury.local:7878           radarr
http://mercury.local:8989           sonarr
http://mercury.local:9696           Prowlarr
                `}
              </pre>
            </Item>
          </Grid>
        </Grid>
        <Link href="http://raspberrypi.local:9000">Portrainer</Link>
      </Box>
    </Dashboard>
  );
}
