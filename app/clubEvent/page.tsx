"use client";
import React, { useState, useMemo, useEffect } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Tabs, Tab, Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import Image from "next/image";
import { Event } from "@/constants/Events";
import { images } from "@/constants/Images";

const ITEMS_PER_PAGE = 10;

const ClubEvent = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [events, setEvents] = useState<Event[]>([]);

  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const fetchEventsData = async () => {
    const response = await fetch("/api/getAllData"); // Adjust the API endpoint as needed

    if (response.ok) {
      const data = await response.json();

      // Process events to match your expected structure
      const processedEvents = data.map((event: any) => ({
        id: event._id, // Using the database _id
        title: event.title,
        description: event.description,
        date: event.start_date, // Assuming you want to use start_date for the event date
        displayDate: formatDate(event.start_date),
        link: event.link,
        image: images.find((img) => img.title === event.title)?.image, // Assuming an image is stored as an array
      }));

      setEvents(processedEvents);
    } else {
      alert("Failed to fetch data!");
    }
  };

  useEffect(() => {
    fetchEventsData();
  }, []);

  // Group events by year
  const eventsByYear = useMemo(() => {
    const grouped = events.reduce<Record<string, Event[]>>((acc, event) => {
      const year = parseInt(event.date.split("-")[0], 10);
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(event);
      return acc;
    }, {});

    // Sort events within each year
    Object.keys(grouped).forEach((year) => {
      grouped[year].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
    });

    return grouped;
  }, [events]);

  const years = useMemo(
    () =>
      Object.keys(eventsByYear)
        .map(Number)
        .sort((a, b) => b - a),
    [eventsByYear],
  );

  const currentEvents = eventsByYear[selectedYear] || [];
  const displayedEvents = currentEvents.slice(0, visibleItems);
  const hasMoreEvents = currentEvents.length > visibleItems;

  const handleYearChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedYear(newValue);
    setVisibleItems(ITEMS_PER_PAGE); // Reset pagination when year changes
  };

  const handleShowMore = () => {
    setVisibleItems((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, currentEvents.length),
    );
  };

  const renderMobileTimeline = (events: Event[]) => (
    <div className="md:hidden space-y-8 px-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-lg overflow-hidden shadow-sm"
        >
          <div className="relative w-full aspect-video">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            {event.date > new Date().toISOString().slice(0, 10) && (
              <Chip label="Upcoming" color="primary" size="small" />
            )}
            {event.date < new Date().toISOString().slice(0, 10) && (
              <Chip label="Past" color="error" size="small" />
            )}
            {event.date === new Date().toISOString().slice(0, 10) && (
              <Chip label="Ongoing" color="success" size="small" />
            )}
            <p className="text-gray-500 text-sm mb-2 mt-2">
              {event.displayDate}
            </p>
            <p className="text-gray-700">{event.description}</p>
            {event.date > new Date().toISOString().slice(0, 10) && (
              <Link href={event.link} target="_blank">
                <button className="btn-event mt-2 uppercase font-semibold">
                  Sign Up
                </button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDesktopTimeline = (events: Event[]) => (
    <div className="hidden md:block">
      <div className="max-w-6xl mx-auto px-4">
        <Timeline
          position="alternate"
          className="p-0 mx-auto"
          sx={{
            "& .MuiTimelineItem-root": {
              minHeight: "300px",
              "&:before": {
                display: "none",
              },
            },
          }}
        >
          {events.map((event, index) => (
            <TimelineItem key={event.id} className="w-full">
              <TimelineOppositeContent
                className="m-0 p-4 md:p-6"
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <div className="relative w-full max-w-md aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 50vw, 33vw"
                    priority
                  />
                </div>
              </TimelineOppositeContent>

              <TimelineSeparator
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  margin: "0 20px",
                }}
              >
                {index !== 0 && (
                  <TimelineConnector
                    sx={{
                      position: "absolute",
                      top: "-130px",
                      height: "150px",
                      left: "calc(50% - 1px)",
                      zIndex: 0,
                    }}
                  />
                )}
                <TimelineDot
                  sx={{
                    margin: 0,
                    position: "relative",
                    zIndex: 1,
                    background: "white",
                    border: "2px solid #1976d2",
                    boxShadow: "none",
                  }}
                />
                {index !== events.length - 1 && (
                  <TimelineConnector
                    sx={{
                      position: "absolute",
                      bottom: "-130px",
                      height: "150px",
                      left: "calc(50% - 1px)",
                      zIndex: 0,
                    }}
                  />
                )}
              </TimelineSeparator>

              <TimelineContent
                className="m-0 p-4 md:p-6"
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="w-full max-w-md">
                  <h3 className="text-xl font-semibold mb-2">
                    {event.title}
                    {event.date > new Date().toISOString().slice(0, 10) && (
                      <Chip
                        label="Upcoming"
                        color="primary"
                        size="small"
                        className="ml-2"
                      />
                    )}
                    {event.date < new Date().toISOString().slice(0, 10) && (
                      <Chip
                        label="Past"
                        color="error"
                        size="small"
                        className="ml-2"
                      />
                    )}
                    {event.date === new Date().toISOString().slice(0, 10) && (
                      <Chip
                        label="Ongoing"
                        color="success"
                        size="small"
                        className="ml-2"
                      />
                    )}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {event.displayDate}
                  </p>
                  <p className="text-gray-700">{event.description}</p>
                  {event.date > new Date().toISOString().slice(0, 10) && (
                    <Link href={event.link} target="_blank">
                      <button className="btn-event mt-2 uppercase font-semibold">
                        Sign Up
                      </button>
                    </Link>
                  )}
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full">
      <div className="mb-8 pt-8">
        <h1 className="text-3xl font-bold text-center mb-2">Club Events</h1>
        <p className="text-center text-gray-600">
          {currentEvents.length === 0
            ? "No events to show for this year"
            : "Join us in our upcoming events"}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-8">
        <Tabs
          value={selectedYear}
          onChange={handleYearChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 3,
          }}
        >
          {years.map((year) => (
            <Tab key={year} label={year.toString()} value={year} />
          ))}
        </Tabs>
      </div>

      {currentEvents.length > 0 && (
        <div className="relative">
          {renderMobileTimeline(displayedEvents)}
          {renderDesktopTimeline(displayedEvents)}
        </div>
      )}

      {hasMoreEvents && (
        <div className="text-center mt-8 mb-8">
          <Button
            variant="contained"
            onClick={handleShowMore}
            sx={{ textTransform: "none" }}
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};
export default ClubEvent;
