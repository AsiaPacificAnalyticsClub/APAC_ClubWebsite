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
  image: null | string;
  link: string;
  date: string;
  tags: string;
};

type Event = {
  id: number;
  title: string;
  description: string;
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
    title: "Data Trivia Quiz",
    description: "Test your data knowledge in a fast-paced trivia game!",
    image: "dsw_TriviaQuiz.png",
    link: "https://app.youths.asia/event/Z0SQgLcLsqGQxEhxtwaQ",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
  {
    id: 2,
    title: "DataHack: Code Quest",
    description: "Solve data challenges to reach the top!",
    image: "dsw_CodeQuest.png",
    link: "",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
  {
    id: 3,
    title: "Machine Learning Mania",
    description: "Build and train a model to predict new data accurately.",
    image: "dsw_MachineLearnigMania.png",
    link: "",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
  {
    id: 4,
    title: "Find the Key",
    description: "Visualize messy data to choose the right key and win!",
    image: "dsw_FindKey.png",
    link: "",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
  {
    id: 5,
    title: "Titanic Survivor",
    description: "Predict Titanic survivors using ML and real data.",
    image: "dsw_Titanic.png",
    link: "",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
  {
    id: 6,
    title: "Data Science Escape Room",
    description: "Solve data puzzles within time limit to escape the room!",
    image: "dsw_EscapeRoom.png",
    link: "",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
  {
    id: 7,
    title: "Word Hunt",
    description: "Find hidden words from clues and scrambled letters.",
    image: "dsw_WordHunt.png",
    link: "",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
  {
    id: 8,
    title: "AI Art Spotting",
    description: "Guess if an image is AI-generated or human-made.",
    image: "dsw_AIArt.png",
    link: "",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
  {
    id: 9,
    title: "Data Science Pictionary",
    description: "Draw and guess data terms — fun and fast-paced!",
    image: "dsw_DSPicctionary.png",
    link: "",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
  {
    id: 11,
    title: "CodinGame",
    description: "Play coding challenges that test your skills and logic.",
    image: "dsw_CodinGame.png",
    link: "",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
  {
    id: 12,
    title: "Data Jeopardy",
    description: "Buzz in to answer data questions — fastest team wins!",
    image: "dsw_DataJeopardy.png",
    link: "",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
  {
    id: 13,
    title: "SQL Detective Game",
    description: "Use SQL to solve a mystery in this story-based game.",
    image: "dsw_SQLDetective.png",
    link: "",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
];

const events: Event[] = [
  {
    id: 1,
    title: "Opening Ceremony",
    description: "Kick off the Data Science Week with an exciting ceremony.",
    image: null,
    link: "test.com",
    date: "2025-04-01, Mon",
    tags: "Upcoming",
  },
  {
    id: 2,
    title: "Python for Data Analysis",
    description: "Hands-on workshop covering pandas and matplotlib.",
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
