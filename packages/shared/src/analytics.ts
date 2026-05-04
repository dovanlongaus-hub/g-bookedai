// GA4 + GTM event tracking utilities

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

// Booking funnel events
export const BookingEvents = {
  viewService: (serviceName: string, price: number) =>
    trackEvent('view_service', { service_name: serviceName, price, currency: 'AUD' }),
  beginBooking: (serviceName: string) =>
    trackEvent('begin_booking', { service_name: serviceName }),
  selectTimeSlot: (serviceName: string, slot: string) =>
    trackEvent('select_time_slot', { service_name: serviceName, time_slot: slot }),
  addPaymentInfo: (method: string) =>
    trackEvent('add_payment_info', { payment_method: method }),
  purchase: (bookingId: string, value: number, serviceName: string) =>
    trackEvent('purchase', { transaction_id: bookingId, value, currency: 'AUD', items: [{ item_name: serviceName }] }),
};

// Chat events
export const ChatEvents = {
  startChat: (language: string) =>
    trackEvent('start_chat', { language }),
  sendMessage: (language: string) =>
    trackEvent('send_message', { language }),
  clickSuggestion: (suggestion: string) =>
    trackEvent('click_suggestion', { suggestion }),
  clickBookNow: (source: string) =>
    trackEvent('click_book_now', { source }),
};
