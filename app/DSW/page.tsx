"use client";

import React, { useState, SyntheticEvent, useEffect } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
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
import { Spinner } from "@/components/ui/spinner";
import { CalendarToday as CalendarTodayIcon } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Modal } from "@mui/material";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DswItem, DswDetails, EventType } from "@/constants/DSW";
import Carousel from "@/app/DSW/sections/Carousel";
import { SearchX, Mic, BriefcaseBusiness, FileText } from "lucide-react";
import DswScheduleCard from "@/components/ui/DSW-Schedule-Card";

export type Year = 2025 | 2026;

const DSW_DETAILS: Record<Year, DswDetails> = {
  2025: {
    date: "24 June - 26 June",
    photoLink:
      "https://cloudmails-my.sharepoint.com/:f:/g/personal/beyondmedia_apu_edu_my/ErpizYVAAnxNvVbp1rfQUM0BtCsYG0Fx5hY-zlbruw29Lg?e=otztwe",
  },
  2026: {
    date: "22 September - 25 September",
    photoLink: null,
  },
};

const PLACEHOLDER_IMAGE = "/APACPythonWorkshop.png"; // Path to your placeholder image

const DswEvent = () => {
  const [openImage, setOpenImage] = useState<string[] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); //track datahack state
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DswItem[]>([]);
  const [type, setType] = useState<EventType>(EventType.GAME);
  const [year, setYear] = useState<Year>(2026);

  const handleTypeChange = (event: SyntheticEvent, type: EventType) => {
    setType(type);
  };

  const handleYearChange = (event: SyntheticEvent, year: Year) => {
    setYear(year);
  };

  const handleOpenPoster = (poster: string) => {
    setCurrentImageIndex(0);
    setOpenImage([poster]);
  };

  useEffect(() => {
    setLoading(true);

    fetch(`/api/DSW?year=${year}&type=${type}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [year, type]);

  const dwsDetails: DswDetails = DSW_DETAILS[year];

  return (
    <div className="min-h-screen w-full bg-white">

      <div className="mb-8 pt-8">

        <h1 className="text-3xl font-bold text-center text-[var(--text)] mb-2">
          Data Science Week {year}
        </h1>

        <p className="text-center text-lg font-bold text-[var(--text-muted)] mb-1">
          {dwsDetails.date}
        </p>
        
      </div>

      <div className="space-y-2 relative mx-auto mb-6 w-full max-w-7xl px-8">
          <p className="text-sm text-[var(--primary-color)] font-bold tracking-wide uppercase">Event Week</p>

          <h1 className="text-6xl font-extrabold tracking-tight">
            <span className="text-[var(--text)]">Four days. </span>
            <span className="text-[var(--primary-color)]">One Experience.</span>
          </h1>

          <p className="text-md text-[var(--text-muted)] font-medium">Explore the tentative programme from 22-25 September 2026.</p>
      </div>

      <Carousel>
        <DswScheduleCard
          day="DAY 1"
          title="Opening & Showcase"
          subtitle="Kick off Data Science Week with the opening ceremony and showcase."
          date="22 SEP"
          type="FULL DAY"
          image="/dsw26/cards/opening.jpg"
          onViewPoster={() => handleOpenPoster("/dsw26/schedule/day-1.jpg")}
        />

        <DswScheduleCard
          day="DAY 2"
          title="Analytical Games & Workshops"
          subtitle="Put your analytical skills to the test through interactive games and hands-on workshops."
          date="23 SEP"
          type="FULL DAY"
          image="/dsw26/cards/games.jpg"
          onViewPoster={() => handleOpenPoster("/dsw26/schedule/day-1.jpg")}
        />

        <DswScheduleCard
          day="DAY 3"
          title="Analytical Games & Workshops"
          subtitle="Continue the challenge with engaging analytical games and practical workshops."
          date="24 SEP"
          type="FULL DAY"
          image="/dsw26/cards/workshops.jpg"
          onViewPoster={() => handleOpenPoster("/dsw26/schedule/day-1.jpg")}
        />

        <DswScheduleCard
          day="DAY 4"
          title="Talks & Industrial Visit"
          subtitle="Gain industry insights through expert talks and an exciting visit to an industry partner."
          date="25 SEP"
          type="FULL DAY"
          image="/dsw26/cards/talks.jpg"
          onViewPoster={() => handleOpenPoster("/dsw26/schedule/day-1.jpg")}
        />
      </Carousel>
      
      <Modal
        open={!!openImage}
        onClose={() => setOpenImage(null)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "auto",
            maxWidth: "90vw",
            maxHeight: "90vh",
            outline: "none",
          }}
        >
          <Image
            src={openImage?.[currentImageIndex] || PLACEHOLDER_IMAGE}
            alt="Schedule poster"
            width={824}
            height={1029}
            style={{
              display: "block",
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: "12px",
            }}
          />
        </Box>
      </Modal>

      <div className="mt-8 max-w-6xl mx-auto px-4 mb-8">
        <div
          className="
            block md:flex
            px-4 mb-8
          "
        >
          <div className="md:flex-1">
            <Tabs
              value={year}
              onChange={handleYearChange}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                minHeight: 0,
              }}
            >
              <Tab label="2026" value={2026} />
              <Tab label="2025" value={2025} />
            </Tabs>
          </div>
          <div className="md:ml-auto">
            <Tabs
              value={type}
              onChange={handleTypeChange}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                minHeight: 0,
              }}
            >
              <Tab label="Tech Talk & Workshop" value={EventType.EVENTS} />
              <Tab label="Games" value={EventType.GAME} />
            </Tabs>
          </div>
        </div>

        <Grid container spacing={4}>
          {!loading ? (
            data.length > 0 ? (
              data.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
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
                        image={item.image || PLACEHOLDER_IMAGE}
                        alt={item.title}
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setCurrentImageIndex(0); // reset to first image
                          setOpenImage(
                            item.images || [item.image || PLACEHOLDER_IMAGE],
                          );
                        }}
                      />
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
                          {item.detailedDescription}
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
                      <Box sx={{ flexGrow: 1 }} />
                      <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        href={item.link}
                        target="_blank"
                        className="w-full"
                        disabled={
                          !item.link ||
                          item.tags !== "Upcoming" ||
                          item.regStatus !== "Open"
                        }
                        sx={{
                          mt: 2,
                          borderRadius: 1,
                          backgroundColor: "#3f51b5",
                          "&:hover": {
                            backgroundColor: "#2e3da0",
                          },
                        }}
                      >
                        {item.regStatus === "Open"
                          ? "Learn More"
                          : item.regStatus === "Full"
                            ? "Registration Full"
                            : "Closed"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <div className="m-auto">
                <Empty className="h-full">
                  <EmptyHeader>
                    <EmptyMedia>
                      <SearchX size={48} />
                    </EmptyMedia>
                    <EmptyTitle className="text-2xl font-bold">
                      No {type}s available for {year}.
                    </EmptyTitle>
                    <EmptyDescription className="text-md max-w-xs text-pretty">
                      Nothing here yet — check back soon!
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </div>
            )
          ) : (
            <Empty className="w-full">
              <EmptyHeader>
                <EmptyMedia>
                  <Spinner className="size-8" />
                </EmptyMedia>
                <EmptyTitle className="text-2xl font-bold">
                  Loading {type}s...
                </EmptyTitle>
                <EmptyDescription className="text-md max-w-xs text-pretty">
                  Fetching the latest Data Science Week activities.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default DswEvent;
