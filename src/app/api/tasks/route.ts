'use server'
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
      {
        params: {
          _limit: 3
        }
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
