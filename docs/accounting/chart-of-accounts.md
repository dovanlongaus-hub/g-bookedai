# Chart of Accounts — Longcare AU

## Revenue Accounts
| Code | Account | GST |
|---|---|---|
| 4100 | AI Mentoring Sessions | GST on Income |
| 4110 | Session Packages (5/10) | GST on Income |
| 4120 | Business Transformation Programs | GST on Income |
| 4130 | Course/Lesson Sales | GST on Income |
| 4200 | Late Cancellation Fees | GST on Income |

## Expense Accounts
| Code | Account | GST |
|---|---|---|
| 5100 | Google Cloud Platform | GST on Expenses |
| 5110 | Software Subscriptions | GST on Expenses |
| 5120 | Stripe Processing Fees | GST on Expenses |
| 5130 | Marketing & Advertising | GST on Expenses |
| 5140 | Contractor Payments | GST Free |
| 5200 | Office & Administration | GST on Expenses |

## GST Treatment
- Australian GST Rate: 10%
- All prices are GST-inclusive
- GST Amount = Price x 10/110
- BAS Reporting: Quarterly
- GST Registration: Required when turnover exceeds $75,000

## Invoice Mapping (Xero)
| Booking Event | Xero Action |
|---|---|
| Payment succeeded (Stripe) | Create invoice + mark paid |
| Bank transfer confirmed | Create invoice + mark paid |
| Refund issued | Create credit note |

## Monthly Reconciliation Checklist
1. Stripe settlements vs Xero bank feed
2. Bank transfer payments vs Xero invoices
3. GST collected vs GST paid
4. Revenue by service category
5. Outstanding invoices
