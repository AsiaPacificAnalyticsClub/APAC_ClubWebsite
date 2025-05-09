"use client";
import React, { useState, SyntheticEvent } from "react";
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Chip,
} from "@mui/material";

type Game = {
  id: number;
  title: string;
  description: string;
  image: null | string;
  link: string;
  tags: string;
};

type Event = {
  id: number;
  title: string;
  description: string;
  image: null | string;
  link: string;
  tags: string;
};
// Add your games and events here
// Uncomment to enabled the games and events section
const games: Game[] = [
  {
    id: 1,
    title: "Data Trivia",
    description: "Test your data knowledge in a fast-paced trivia game!",
    image: null,
    link: "test.com",
    tags: "Ongoing",
  },
  {
    id: 2,
    title: "Code Quest",
    description: "Solve data challenges to reach the top!",
    image: null,
    link: "",
    tags: "Past",
  },
];

const events: Event[] = [
  {
    id: 1,
    title: "Opening Ceremony",
    description: "Kick off the Data Science Week with an exciting ceremony.",
    image: null,
    link: "test.com",
    tags: "Upcoming",
  },
  {
    id: 2,
    title: "Python for Data Analysis",
    description: "Hands-on workshop covering pandas and matplotlib.",
    image: null,
    link: "",
    tags: "Upcoming",
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
            ? "No upcoming activities"
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
          {content.length > 0 ? (
            content.map((item) => (
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
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6" component="div" gutterBottom>
                      {item.title}{" "}
                      <Chip
                        label={item.tags}
                        color={
                          item.tags === "Ongoing"
                            ? "success"
                            : item.tags === "Past"
                              ? "error"
                              : "primary"
                        }
                        size="small"
                      />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      href={item.link}
                      target="_blank"
                      className="w-full"
                      disabled={!item.link || item.tags !== "Upcoming"}
                      sx={{ mt: 2, borderRadius: 1 }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <div className="absolute flex justify-center items-center">
                <h1 className="text-3xl font-bold text-center mb-2">
                  Coming Soon
                </h1>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default DswEvent;
