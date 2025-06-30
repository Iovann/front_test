"use client";

import { fetchShelves } from "@/src/services/gloseApi";
import { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShelves();
      console.log(data);
    };
    fetchData();
  }, []);

  return <div>Test</div>;
}