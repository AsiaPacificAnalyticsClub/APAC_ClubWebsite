"use client";
import React, { useState, SyntheticEvent } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

// Dummy data for games and events
const games = [
  {
    id: 1,
    title: "Data Trivia",
    description: "Test your data knowledge in a fast-paced trivia game!",
    image: null,
  },
  {
    id: 2,
    title: "Code Quest",
    description: "Solve data challenges to reach the top!",
    image: null, // example path
  },
];

const events = [
  {
    id: 1,
    title: "Opening Ceremony",
    description: "Kick off the Data Science Week with an exciting ceremony.",
    image: null,
  },
  {
    id: 2,
    title: "Workshop: Python for Data Analysis",
    description: "Hands-on workshop covering pandas and matplotlib.",
    image: null,
  },
];

const placeholderImage = "/APACPythonWorkshop.png"; // Path to your placeholder image

const DswEvent = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  const content = value === 0 ? games : events;

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mb-8 pt-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Data Science Week
        </h1>
        <p className="text-center text-gray-600">
          {content.length === 0
            ? "No events to show for this year"
            : "Join us in our upcoming activities"}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-8">
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 3,
          }}
        >
          <Tab label="Games" value={0} />
          <Tab label="Events" value={1} />
        </Tabs>

        <Grid container spacing={4}>
          {content.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={item.image || placeholderImage}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default DswEvent;
