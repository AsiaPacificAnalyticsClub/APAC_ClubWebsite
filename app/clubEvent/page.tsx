
"use client";
import React, { useState, useMemo, useEffect } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Tabs, Tab, Button, Modal, Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import Image from "next/image";
import { Event } from "@/constants/Events";
import { ApiEvent } from "@/constants/ApiEvent";
import { images } from "@/constants/Images";

const ITEMS_PER_PAGE = 10;

const ClubEvent = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [events, setEvents] = useState<Event[]>([]);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [zoomTitle, setZoomTitle] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);

  const [naturalWidth, setNaturalWidth] = useState<number | null>(null);
  const [naturalHeight, setNaturalHeight] = useState<number | null>(null);

  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Move fetchEventsData inside useEffect to handle the dependency warning
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/getAllData?t=${Date.now()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data: ApiEvent[] = await response.json();

        const processedEvents: Event[] = data.map((event) => ({
          id: event._id,
          title: event.title,
          date: event.start_date,
          displayDate: formatDate(event.start_date),
          description: event.description,
          image: images.find((img) => img.title === event.title)?.image || "",
          link: event.link,
          registrationStartDate: event.registration_start_date,
          registrationEndDate: event.registration_end_date,
        }));

        setEvents(processedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        // Handle error appropriately
      }
    };

    fetchEvents();
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

  const handleImageClick = (image: string, title: string) => {
    setZoomImage(image);
    setZoomTitle(title);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const renderMobileTimeline = (events: Event[]) => {
    const today = new Date().toISOString().slice(0, 10);
    return (
      <div className="md:hidden space-y-8 px-4">
        {events.map((event) => {
          const imgObj = images.find((img) => img.title === event.title);
          const imageSrc = imgObj?.imageMobile || imgObj?.image || event.image;
          // Find end_date if available (from event or data)
          // For now, try to get it from event.end_date if present, else fallback to event.date
          // If your Event type does not have end_date, you may need to extend it
          const endDate = (event as any).end_date || event.date;
          let label = null;
          if (event.date > today) {
            label = <Chip label="Upcoming" color="primary" size="small" />;
          } else if (endDate < today) {
            label = <Chip label="Past" color="error" size="small" />;
          } else {
            label = <Chip label="Ongoing" color="success" size="small" />;
          }
          return (
            <div
              key={event.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div
                className="relative w-full aspect-video cursor-pointer"
                onClick={() => handleImageClick(imageSrc, event.title)}
              >
                <Image
                  src={imageSrc}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                {label}
                <p className="text-gray-500 text-sm mb-2 mt-2">
                  {event.displayDate}
                </p>
                <p className="text-gray-600 text-xs mb-2">
                  Registration: {formatDate(event.registrationStartDate)} - {formatDate(event.registrationEndDate)}
                </p>
                <p className="text-gray-700">{event.description}</p>                
                {event.date > today && (
                  <Link href={event.link} target="_blank">
                    <button className="btn-event mt-2 uppercase font-semibold">
                      Sign Up
                    </button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

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
                {(() => {
                  const imgObj = images.find((img) => img.title === event.title);
                  const imageSrc = imgObj?.imageDesktop || imgObj?.image || event.image;
                  return (
                    <div
                      className="relative w-full max-w-md aspect-video overflow-hidden rounded-lg cursor-pointer"
                      onClick={() => handleImageClick(imageSrc, event.title)}
                    >
                      <Image
                        src={imageSrc}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1280px) 50vw, 33vw"
                        priority
                      />
                    </div>
                  );
                })()}
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
                  <p className="text-gray-600 text-xs mb-2">
                    Registration: {formatDate(event.registrationStartDate)} - {formatDate(event.registrationEndDate)}
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
           <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            className="flex"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                borderRadius: "16px",
                border: "2px solid #4f4f4f",
                boxShadow: 24,
                outline: "none",
                overflow: "hidden",
                maxWidth: "90vw",
                maxHeight: "90vh",
              }}
            >
              {zoomImage && (
                <img
                  src={zoomImage}
                  alt={zoomTitle}
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                  }}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    setNaturalWidth(img.naturalWidth);
                    setNaturalHeight(img.naturalHeight);
                  }}
                />
              )}
            </Box>
          </Modal>
    </div>
  );
};
export default ClubEvent;
