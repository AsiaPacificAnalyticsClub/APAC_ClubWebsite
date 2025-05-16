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

import { CalendarToday as CalendarTodayIcon } from "@mui/icons-material";

type Game = {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string;
  image: null | string;
  link: string;
  date: string;
  tags: string;
};

type Event = {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string; // Optional detailed description
  image: null | string;
  link: string;
  date: string;
  tags: string;
};
// Add your games and events here
// Uncomment to enabled the games and events section
const games: Game[] = [
  {
    id: 1,
    title: "Find the Key",
    description: "Clean, fix and visualize messy data to choose the right key and win!",
    detailedDescription: "A beginner-friendly competition where participants clean raw data, create visualizations, and uncover hidden insights. The 'key' lies in how well they prepare and understand the dataset.",
    image: "dsw_FindKey.png",
    link: "https://app.youths.asia/event/Z0SQgLcLsqGQxEhxtwaQ",
    date: "2025-06-24, Tues",
    tags: "Upcoming",
  },
  {
    id: 2,
    title: "Dataverse Explorers",
    description: "A fun, gamified session combining quizzes, drawing, and strategy challenges.",
    detailedDescription: "An interactive session designed to teach data science concepts through games, encouraging creativity, collaboration, and use of data terms in a stress-free environment ideal for students and beginners.",
    image: "dsw_Dataverse.png",
    link: "",
    date: "2025-06-24, Tues",
    tags: "Upcoming",
  },
  {
    id: 3,
    title: "DataHack: Code & Solve",
    description: "Solve data challenges to reach the top!",
    detailedDescription: "Inspired by LeetCode, this coding challenge tasks participants with solving programming problems of increasing difficulty. It rewards speed, accuracy, and strategic thinking in a race for the leaderboard.",
    image: "dsw_DataHack.png",
    link: "",
    date: "2025-06-25, Wed",
    tags: "Upcoming",
  },
  {
    id: 4,
    title: "SQL Murder Mystery Showdown",
    description: "Use SQL to follow clues and solve a murder mystery. Be the fastest detective with the right answers!",
    detailedDescription: "Participants become detectives solving a fictional murder case using SQL queries. They analyze clues in a database, identify suspects, and race to uncover both the murderer and hidden mastermind.",
    image: "dsw_SQL.png",
    link: "",
    date: "2025-06-25, Wed",
    tags: "Upcoming",
  },
  {
    id: 5,
    title: "Machine Learning Tuning Challenge",
    description: "Tune a machine learning model to get the best results!",
    detailedDescription: "A 2-hour hands-on competition where participants will adjust model settings (hyperparameters) to improve prediction accuracy on a real dataset. A quick and exciting intro to model optimization and leaderboard competition.",
    image: "dsw_MLTuning.png",
    link: "",
    date: "2025-06-26, Thur",
    tags: "Upcoming",
  },
  {
    id: 6,
    title: "Titanic Survivor",
    description: "Predict Titanic survivors using ML and real data.",
    detailedDescription: "A team-based challenge where participants use real Titanic data to build machine learning models that predict survival. A great way to practice data cleaning, feature selection, and evaluation on Google Colab.",
    image: "dsw_Titanic.png",
    link: "",
    date: "2025-06-26, Thur",
    tags: "Upcoming",
  }
];

const events: Event[] = [
  {
    id: 1,
    title: "Opening Ceremony",
    description: "Kick off the Data Science Week with an exciting ceremony.",
    detailedDescription: "",
    image: null,
    link: "test.com",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
  {
    id: 2,
    title: "Python for Data Analysis",
    description: "Hands-on workshop covering pandas and matplotlib.",
    detailedDescription: "",
    image: null,
    link: "",
    date: "2025-04-01, Mon",
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
          Data Science Week 2025
        </h1>
        <p className="text-center text-lg font-semibold text-indigo-700 mb-1">
          24 June - 26 June
        </p>
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
                    borderRadius: 4, //round corner Kylan Shane want
                    overflow: "hidden", // picture follow card curve
                    boxShadow: 6, //3d card
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={item.image || placeholderImage}
                      alt={item.title}
                    />
                    {/* Detailed description overlay when hovering to image */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        backdropFilter: "blur(4px)",
                        color: "#fff",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        padding: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                    >
                      <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                        {item.detailedDescription || item.description}
                      </Typography>
                    </Box>
                  </Box>
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
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="0.9rem"
                      sx={{
                        display: "flex",
                      }}
                    >
                      <CalendarTodayIcon
                        sx={{
                          color: "text.secondary",
                          mr: 0.5,
                          fontSize: "1.2rem",
                          mb: 1,
                        }}
                      />
                      {item.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="0.9rem"
                    >
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
                      sx={{
                        mt: 2,
                        borderRadius: 1,
                        backgroundColor: "#3f51b5",
                        "&:hover": {
                          backgroundColor: "#2e3da0",
                        },
                      }}
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