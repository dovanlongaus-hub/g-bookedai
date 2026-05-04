// Google Meet links are created via Calendar API (conferenceData)
// This module provides helper utilities for Meet-related operations

export const meetService = {
  generateMeetLink(eventId: string): string {
    // Meet links are auto-generated when creating calendar events with conferenceData
    // This is a fallback for generating manual meet links
    return `https://meet.google.com/lookup/${eventId}`;
  },

  isValidMeetUrl(url: string): boolean {
    return /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/.test(url);
  },
};
