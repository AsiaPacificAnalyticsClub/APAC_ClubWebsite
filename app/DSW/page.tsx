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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Modal } from "@mui/material";
import Image from "next/image";
import LocationOnIcon from '@mui/icons-material/LocationOn';

type Game = {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string;
  image: null | string;
  images?: string[]; // only for datahack cuz it has 2 poster wth
  link: string;
  date: string;
  time: string;
  venue: string; // Added venue for games
  tags: string;
};

type Event = {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string; // Optional detailed description
  image: null | string;
  images?: string[];
  link: string;
  date: string;
  time: string;
  venue: string; // Added venue for events
  tags: string;
};
// Add your games and events here
// Uncomment to enabled the games and events section
const games: Game[] = [
  {
    id: 1,
    title: "Find the Key",
    description:
      "Have you always wanted to dive into data analytics but never done it? Say no more! 🤩",
    detailedDescription:
      "We set up the Find The Key Competition just for you! You don’t need to know anything, just be interested and we’ll help you unleash your data and turn it into appealing content. The twist? How you manage the data equally shapes the outcome of your storytelling. Only 40 players are allowed in each slot and you can win some fun rewards too 🤫. Learn about trading and you may end up winning something exciting!",
    image: "/dsw_FindKey.png",
    link: "https://app.youths.asia/event/ZAtKyz37GpymbiasKOSg",
    date: "2025-06-24, Tues",
    time: "9:30 AM - 11:30 AM",
    venue: "APU Campus Block D-06-03",
    tags: "Upcoming",
  },
  {
    id: 2,
    title: "Dataverse Explorers",
    description:
      "Still trying to get into Data Analytics in a more exciting, engaging way? Buckle up your curiosity and skills as we're going on a Data Adventure!",
    detailedDescription:
      "On our journey, we'll be diving into the fundamentals of data science in a low-pressure, hands-on setting where learning is powered by fun, teamwork, and creativity. Discover the new side of Data Analytics where it involves beyond than just coding.",
    image: "/dsw_DataverseExplorers.png",
    link: "https://app.youths.asia/event/oFNlyJ45PnlOuLYPyV9Z",
    date: "2025-06-24, Tues",
    time: "1:00 PM - 3:00 PM",
    venue: "APU Campus Block D-06-03",
    tags: "Upcoming",
  },
  {
    id: 3,
    title: "DataHack: Code & Solve",
    description: 
      "Are you ready to solve tough problems and climb the leaderboard while coding meets competition? 🤔",
    detailedDescription:
      "In our event, you will need to take on a series of brainstorming programming and data challenges that grows harder as you rise through the ranks. Along the way, you will sharpen your coding skills, learn how to solve problems efficiently, and level-up your data science mindset - all while racing up to the top !",
    image: "/dsw_DataHack.png",
    images: ["/dsw_DataHack.png", "/dsw_DataHack_Rules.png"],
    link: "https://app.youths.asia/event/oaP3nOkU9m1OYWfzlR1j",
    date: "2025-06-25, Wed",
    time: "9:30 AM - 11:30 AM",
    venue: "APU Campus Block D-06-03",
    tags: "Upcoming",
  },
  {
    id: 4,
    title: "SQL Murder Mystery Showdown",
    description: 
      "Use SQL to follow clues and solve a murder mystery. Be the fastest detective with the right answers!",
    detailedDescription: 
      "Are you an analytical detective who can solve a mysterious murder case with SQL? In this showdown, young detectives compete with each other to find the sussy imposter by implementing SQL knowledge and problem solving skills.",
    image: "/dsw_SQL.png",
    link: "https://app.youths.asia/event/hwMVhiahOK8deI1108cM",
    date: "2025-06-25, Wed",
    time: "1:00 PM - 3:00 PM",
    venue: "APU Campus Block D-06-03",
    tags: "Upcoming",
  },
  {
    id: 5,
    title: "Machine Learning Tuning Challenge",
    description: 
      "Think you can tune your way to the top? 👨‍💻",
    detailedDescription:
      "Join our 2-hour Machine Learning Showdown and put your skills to the test by fine-tuning an MLPClassifier on the Covertype dataset! Compete live with 60 participants and climb the leaderboard in real-time 🔥",
    image: "/dsw_MachineLearning.png",
    link: "https://app.youths.asia/event/8OK4rZ03r3KKVHWrPzpW",
    date: "2025-06-26, Thur",
    time: "9:30 AM - 11:30 AM",
    venue: "APU Campus Block D-06-03",
    tags: "Upcoming",
  },
  {
    id: 6,
    title: "Titanic Survivor",
    description:
      "Don't worry about where to start – we have got you covered with the dataset from Kaggle 🙌.",
    detailedDescription:
      "Whether you are a beginner or have some experience, this is your chance to see a real-world data science workflow! Don't miss it~😉",
    image: "/dsw_Titanic.png",
    link: "https://app.youths.asia/event/dPhwLL2PJOeoO9cvfguc",
    date: "2025-06-26, Thur",
    time: "3:00 PM - 5:00 PM",
    venue: "APU Campus Block D-06-03",
    tags: "Upcoming",
  },
];

const events: Event[] = [
  {
    id: 1,
    title: "Insight of Data Science: Current Hiring Trends in the Data Science Industry",
    description:
      "🧠💼Curious on how people actually get hired in Data Science industry? Wondering what sort of skills the company really want? Or how to stand out among others? 👀📊 This session is perfect for you! Come and join us for “Insights of Data Science: Current Hiring Trends in the Data Science Industry” featuring from a Head of Data Analytics and AI at DataMicron Systems Sdn Bhd!🚀📈",
    detailedDescription: "",
    image: "/evnt_InsightDS.png",
    link: "https://app.youths.asia/event/dMoqMkpCgeyMDsumMIC4",
    date: "2025-06-24, Tues",
    time: "1:00 PM - 3:00 PM",
    venue: "APU Campus Block A, Auditorium 3",
    tags: "Upcoming",
  },
  {
    id: 2,
    title: "GIS To Monitor Smart Cities",
    description:
      "Wondered how cities become “smart”? It’s about using map and location data to make decisions! Join our workshop to learn how a type of mapping technology called Esri GIS (Geographic Information Systems), helps cities monitor everything from traffic and pollution to public services. In this workshop, hosted by DLS Solution, you'll learn how advanced mapping tools can help urban managers get real-time spatial insights to make cities smarter, cleaner, safer, and more efficient. You don't need a tech background to join!",
    detailedDescription: "",
    image: "/evnt_GIS.png",
    link: "https://app.youths.asia/event/Gslgen7n95IQ9PAdC6Uh",
    date: "2025-06-24, Tues",
    time: "3:00 PM - 5:00 PM",
    venue: "APU Campus Block A, Auditorium 3",
    tags: "Upcoming",
  },
  {
    id: 3,
    title: "Autonomous Decision-Making and Optimization in Healthcare and Agriculture",
    description:
      "🚀Ready to dive into the world of AI and Data Analytics?It’s not just about tech, but also saving lives and growing food in a smarter way? Yes, you heard that right! We are talking about Healthcare🏥 and Agriculture🌾 in the world of Artificial Intelligence and Data Analytics! Join us at APCORE - Center of Robotics for a mind-blowing session on how intelligent robotic systems can optimise in these two fields. 🤖✨",
    detailedDescription: "",
    image: "/evnt_autonomous.png",
    link: "https://app.youths.asia/event/5KOIu8drgMREFkRvHjAi",
    date: "2025-06-24, Tues",
    time: "9:30 AM - 11:30 AM",
    venue: "APU Campus Block A, Auditorium 3",
    tags: "Upcoming",
  },
  {
    id: 4,
    title: "Smart and Adaptive AI Agents at the Edge",
    description:
      "Join us in our exciting session with Ir. Naren from CREDIT Center of IoT to discover how real-time active inference is transforming IoT🕹️ and drones🚁 into intelligent and adaptive systems that are next-level cool, no cap!!👀🚀",
    detailedDescription: "",
    image: "/evnt_AIAgent.png",
    link: "https://app.youths.asia/event/sTAe7AyazLenskHE29je",
    date: "2025-06-25, Wed",
    time: "3:00 PM - 5:00 PM",
    venue: "APU Campus Block A, Auditorium 3",
    tags: "Upcoming",
  },
  {
    id: 5,
    title: "Practical AI workshop - UM Startup Community",
    description:
      "Wanna build your own smart AI system from scratch?👀🧠 Step into an exciting session where you’ll learn how to create intelligent workflows from web scraping all the way to multi-agent systems that think, decide, and act like real teammates!🤖⚙️Hosted by the UM Startup Community, this session is perfect for AI newbies and automation enthusiasts alike. Whether you’re curious or committed, we got you covered with practical skills and powerful tools that’ll level up your game💻💥.",
    detailedDescription: "",
    image: "/evnt_PracticalAI.png",
    link: "https://app.youths.asia/event/sv4soywVZupG9Rz0va4P",
    date: "2025-06-20, Fri",
    time: "9:30 AM - 11:30 AM",
    venue: "APU Campus Block A, Auditorium 3",
    tags: "Upcoming",
  },
  {
    id: 6,
    title: "AWS Workshop: Building data pipeline to support analyzing clickstream data with AWS",
    description:
      "Ready to level up your skills? Pull up to our AWS Workshop and learn how to build a data pipeline for analyzing clickstream data💥. You’ll get hands-on experience with AWS tools to click into insights that actually slap📊💡.",
    detailedDescription: "",
    image: "/evnt_AWS.png",
    link: "https://app.youths.asia/event/6dA77OsXE4RN8Js3YZ7E",
    date: "2025-06-20, Fri",
    time: "9:30 AM - 11:30 AM",
    venue: "APU Campus Block A, Auditorium 3",
    tags: "Upcoming",
  },
  {
    id: 7,
    title: "DELL Tech Talk Series : Large Language Models and Machine Learning by DELL",
    description:
      "AI is not future anymore, it’s NOW‼️🤯 Don’t miss it and catch the vibes with DELL Tech Talk Series on Large Language Models and Machine Learning!🕹️🤖",
    detailedDescription: "",
    image: "/evnt_DellTech.png",
    link: "https://app.youths.asia/event/NbEGdSz7MlnzBWqoavsx",
    date: "2025-06-26, Thur",
    time: "1:00 PM - 3:00 PM",
    venue: "APU Campus, D-06-03",
    tags: "Upcoming",
  },
  {
    id: 8,
    title: "Using Power BI for Data Analysis",
    description:
      "📊✨Wanna level up your data game and actually understand what is going on in those dashboard? Power BI here to save your analytics life with Dr. Mohammed Al-Obaydee is gonna show you how it is done! 🧠💻 This is where your glow-up in data analytics begins!",
    detailedDescription: "",
    image: "/evnt_PowerBI.png",
    link: "",
    date: "2025-06-25, Wed",
    time: "9:00 am - 11:30 am",
    venue: "APU Campus Block A, Auditorium 3",
    tags: "To Be Confirmed",
  },
  {
    id: 9,
    title: "Beyond the Hype: Unpacking the Planning and Reasoning Abilities of LLMs and LRMs",
    description:
      "LLMs can do many things such as write poems, essays even code, but do they actually think or plan? Or just remixing the patterns? 🤖💭Come join us to go beyond the hype to unpack whether LLMs and LRMs are true reasoners or just really good guessers. ",
    detailedDescription: "",
    image: "/evnt_BeyondHype.png",
    link: "",
    date: "To Be Confirmed",
    time: "To Be Confirmed",
    venue: "To Be Confirmed",
    tags: "To Be Confirmed",
  }
];

const placeholderImage = "/APACPythonWorkshop.png"; // Path to your placeholder image

const DswEvent = () => {
  const [openImage, setOpenImage] = useState<string[] | null>(null);

  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  const content = value === 0 ? games : events;

  const [currentImageIndex, setCurrentImageIndex] = useState(0); //track datahack state

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
            : "Join us in our upcoming activities."}
        </p>
      </div>

      {/* enlarge poster when click */}
      <Modal
        open={!!openImage}
        onClose={() => setOpenImage(null)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "60%",
            outline: "none",
          }}
        >
          <Image
            src={openImage?.[currentImageIndex] || placeholderImage}
            alt="Enlarged preview"
            layout="responsive"
            width={800}
            height={500}
            style={{ borderRadius: "12px" }}
          />

          {/* Only show nav if multiple images */}
          {openImage && openImage.length > 1 && (
            <>
              <Button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? openImage.length - 1 : prev - 1,
                  )
                }
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 8,
                  transform: "translateY(-50%)",
                  zIndex: 1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                }}
              >
                ◀
              </Button>
              <Button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === openImage.length - 1 ? 0 : prev + 1,
                  )
                }
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 8,
                  transform: "translateY(-50%)",
                  zIndex: 1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                }}
              >
                ▶
              </Button>
            </>
          )}
        </Box>
      </Modal>

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
                  <Box
                    sx={{
                      position: "relative",
                      "&:hover .hover-overlay": {
                        opacity: 1,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={item.image || placeholderImage}
                      alt={item.title}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setCurrentImageIndex(0); // reset to first image
                        setOpenImage(
                          item.images || [item.image || placeholderImage],
                        );
                      }}
                    />
                    {/* Hover Overlay for games only */}
                    {value === 0 && (
                      <Box
                        className="hover-overlay"
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
                          pointerEvents: "none",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "0.85rem" }}
                        >
                          {item.detailedDescription || item.description}
                        </Typography>
                      </Box>
                    )}
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
                      sx={{
                        display: "flex",
                      }}
                    >
                      <AccessTimeIcon
                        sx={{
                          color: "text.secondary",
                          mr: 0.5,
                          fontSize: "1.2rem",
                          mb: 1,
                        }}
                      />
                      {item.time}
                    </Typography>
                    <Typography //added venue
                      variant="body2"
                      color="text.secondary"
                      fontSize="0.9rem"
                      sx={{
                        display: "flex",
                      }}
                    >
                      <LocationOnIcon
                        sx={{
                          color: "text.secondary",
                          mr: 0.5,
                          fontSize: "1.2rem",
                          mb: 1,
                        }}
                      />
                      {item.venue}
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
