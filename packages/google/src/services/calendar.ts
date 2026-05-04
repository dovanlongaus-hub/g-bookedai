import { google, calendar_v3 } from 'googleapis';
import { getGoogleAuth } from '../lib/auth.js';

function getCalendar() {
  return google.calendar({ version: 'v3', auth: getGoogleAuth() });
}

export const calendarService = {
  async createBookingEvent(params: {
    summary: string;
    description: string;
    startTime: Date;
    endTime: Date;
    attendeeEmail: string;
    mentorEmail: string;
    createMeetLink: boolean;
  }): Promise<{ eventId: string; meetUrl: string | null; htmlLink: string }> {
    const calendar = getCalendar();

    const event: calendar_v3.Schema$Event = {
      summary: params.summary,
      description: params.description,
      start: { dateTime: params.startTime.toISOString(), timeZone: 'Australia/Sydney' },
      end: { dateTime: params.endTime.toISOString(), timeZone: 'Australia/Sydney' },
      attendees: [
        { email: params.attendeeEmail },
        { email: params.mentorEmail },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 24h reminder
          { method: 'popup', minutes: 60 },        // 1h reminder
        ],
      },
    };

    if (params.createMeetLink) {
      event.conferenceData = {
        createRequest: {
          requestId: `bookedai-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      };
    }

    const res = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: params.createMeetLink ? 1 : 0,
      sendUpdates: 'all',
    });

    return {
      eventId: res.data.id || '',
      meetUrl: res.data.conferenceData?.entryPoints?.[0]?.uri || null,
      htmlLink: res.data.htmlLink || '',
    };
  },

  async cancelEvent(eventId: string): Promise<void> {
    const calendar = getCalendar();
    await calendar.events.delete({
      calendarId: 'primary',
      eventId,
      sendUpdates: 'all',
    });
  },

  async rescheduleEvent(eventId: string, newStart: Date, newEnd: Date): Promise<{ meetUrl: string | null }> {
    const calendar = getCalendar();
    const res = await calendar.events.patch({
      calendarId: 'primary',
      eventId,
      requestBody: {
        start: { dateTime: newStart.toISOString(), timeZone: 'Australia/Sydney' },
        end: { dateTime: newEnd.toISOString(), timeZone: 'Australia/Sydney' },
      },
      sendUpdates: 'all',
    });

    return {
      meetUrl: res.data.conferenceData?.entryPoints?.[0]?.uri || null,
    };
  },

  async getAvailability(calendarId: string, timeMin: Date, timeMax: Date) {
    const calendar = getCalendar();
    const res = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: calendarId }],
        timeZone: 'Australia/Sydney',
      },
    });
    return res.data.calendars?.[calendarId]?.busy || [];
  },
};
