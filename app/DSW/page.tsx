"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Tabs, Tab, Button, Modal, Box } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/constants/Images";

const ITEMS_PER_PAGE = 10;
const events = 0;

const DswEvent = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="mb-8 pt-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Data Science Week
        </h1>
        <p className="text-center text-gray-600">
          {events === 0
            ? "No events to show for this year"
            : "Join us in our upcoming events"}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-8">
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          centered
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 3,
          }}
        >
          <Tab label={"Games"} value={0} />
          <Tab label={"Events"} value={1} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <h1>test</h1>
      </TabPanel>
    </div>
  );
};
export default DswEvent;
