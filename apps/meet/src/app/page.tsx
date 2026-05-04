import { redirect } from 'next/navigation';

export default function MeetHome() {
  // Root redirects to Google Meet "new meeting" page
  redirect('https://meet.google.com/new');
}
