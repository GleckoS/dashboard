"use client";

import {
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  Box,
  Skeleton,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

export type CryptoData = {
  [key: string]: {
    id: number;
    name: string;
    symbol: string;
    quote: {
      USD: {
        price: number;
        volume_24h: number;
        percent_change_24h: number;
        market_cap: number;
      };
    };
  };
};

export const CryptoDashboard = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/crypto");
        setCryptoData(response.data);
      } catch (err) {
        setError(JSON.stringify(err) || "Failed to fetch cryptocurrency data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (loading) {
    return (
      <Grid item xs={12} lg={7}>
        <Skeleton sx={{ marginTop: "18px" }} variant="rounded" height={300} />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid item xs={12} lg={7}>
        <Typography color="error" variant="h6" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid item xs={12} lg={7}>
      <Paper
        sx={{
          marginBottom: "32px",
          border: "1px solid #D3D3D3",
          textAlign: "center",
          padding: "12px",
          color: "#093549",
        }}
        elevation={0}
      >
        <Typography variant="h2" fontWeight="700" fontSize="1.5rem">
          CoinMarketCap: Crypto API
        </Typography>
      </Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CryptoChart cryptoData={cryptoData!} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CryptoList cryptoData={cryptoData!} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const CryptoChart = ({ cryptoData }: { cryptoData: CryptoData }) => {
  const labels = Object.keys(cryptoData);
  const data = Object.values(cryptoData).map(
    (crypto) => crypto.quote.USD.price
  );

  return (
    <Box sx={{ width: 300, height: 300, mx: "auto" }}>
      <Doughnut
        data={{
          labels,
          datasets: [
            {
              data,
              backgroundColor: ["#9FC1D1", "#B9D8E3", "#DDE9F2"],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          cutout: "70%",
        }}
      />
    </Box>
  );
};

const CryptoList = ({ cryptoData }: { cryptoData: CryptoData }) => (
  <Paper elevation={3}>
    <List>
      {Object.values(cryptoData).map((crypto) => (
        <ListItem key={crypto.id} sx={{ display: "block" }}>
          <Typography variant="body1">
            {crypto.name} ({crypto.symbol})
          </Typography>
          <Typography color="#6A6A6A" variant="body2">
            Price: ${crypto.quote.USD.price.toFixed(2)} | Market Cap: $
            {crypto.quote.USD.market_cap.toLocaleString()} | 24h Volume:{" "}
            {crypto.quote.USD.volume_24h.toFixed(2)} | 24h Change:{" "}
            {crypto.quote.USD.percent_change_24h.toFixed(2)}%
          </Typography>
        </ListItem>
      ))}
    </List>
  </Paper>
);
