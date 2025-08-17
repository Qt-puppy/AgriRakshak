"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Home() {
  const [result, setResult] = useState<string>(""); // <-- FIXED: define state

  async function handleAnalyze() {
    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "Hello from frontend" }),
      });

      const data = await res.json();
      setResult(data.message); // <-- now works
    } catch (error) {
      console.error(error);
      setResult("Error while analyzing.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px] shadow-lg rounded-2xl">
        <CardContent className="flex flex-col items-center space-y-4 p-6">
          <Button onClick={handleAnalyze} className="w-full">
            Run Analysis
          </Button>
          <p className="text-center text-gray-700">{result}</p>
        </CardContent>
      </Card>
    </div>
  );
}
