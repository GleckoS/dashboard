import axios from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await axios.get(
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CRYPTO_KEY,
        },
        params: {
          symbol: "ETH,USDT,USDC",
        },
      }
    );

    return NextResponse.json(response.data.data); 
  } catch (error) {
    console.error("Failed to fetch cryptocurrencies:", error);
    return NextResponse.json(
      { error: "Failed to fetch cryptocurrency data." },
      { status: 500 }
    );
  }
}
