# Conversion Events — GA4 Tracking

## longcare.au (G-CKG4YQ57VV)

### Booking Funnel
| Event | Trigger | Parameters |
|---|---|---|
| view_service | Select service in step 1 | service_name, price, currency |
| select_time_slot | Select time in step 2 | time_slot |
| add_contact_info | Submit contact form | has_phone |
| begin_checkout | Click "Pay with Card" | service_name, value, currency |
| add_payment_info | Select bank transfer | method (bank_aud/bank_vnd) |
| purchase | Booking confirmed (pay later or payment) | method, service_name, value |

### Chat Events
| Event | Trigger | Parameters |
|---|---|---|
| open_chat | Open chat widget | — |
| send_chat_message | Send a message | language |
| click_suggestion | Click quick suggestion | suggestion |

### Mark as Conversions in GA4
1. Go to Admin → Events
2. Mark these as conversions: purchase, begin_checkout, sign_up

## g.bookedai.au (G-2L68DR1GD4)

### Signup Funnel
| Event | Trigger | Parameters |
|---|---|---|
| sign_up | Submit signup form | method |
| start_trial | Click "Start Free Trial" | — |
| contact_sales | Click "Contact Sales" | — |
| view_pricing | Scroll to pricing section | — |

### Measurement Paths
- longcare.au: /metrics
- g.bookedai.au: /analytics
