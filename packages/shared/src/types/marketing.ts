export const CAMPAIGN_STATUSES = [
  'DRAFT',
  'NEEDS_REVIEW',
  'APPROVED',
  'SCHEDULED',
  'PUBLISHED',
  'PAUSED',
] as const;

export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];

export const CONTENT_CHANNELS = [
  'google_ads',
  'youtube_shorts',
  'linkedin',
  'facebook',
  'instagram',
  'email_newsletter',
  'google_business_profile',
  'seo_blog',
] as const;

export type ContentChannel = (typeof CONTENT_CHANNELS)[number];

export interface MarketingCampaign {
  id: string;
  tenantId: string;
  name: string;
  channel?: string;
  status: CampaignStatus;
  utmCampaign?: string;
  brief?: string;
  approvedBy?: string;
  approvedAt?: Date;
  scheduledAt?: Date;
  publishedAt?: Date;
  createdAt: Date;
}

export interface SocialContentItem {
  id: string;
  campaignId: string;
  channel: ContentChannel;
  headline?: string;
  body?: string;
  ctaText?: string;
  ctaUrl?: string;
  mediaUrl?: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent?: string;
  status: 'DRAFT' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED';
  scheduledAt?: Date;
  publishedAt?: Date;
  createdAt: Date;
}

export interface CampaignDraft {
  channel: ContentChannel;
  headline: string;
  body: string;
  cta: string;
  utmParams: {
    source: string;
    medium: string;
    campaign: string;
    content?: string;
  };
}

export interface WeeklyContentPlan {
  videos: SocialContentItem[]; // 3 per week
  linkedinPosts: SocialContentItem[]; // 2 per week
  facebookPosts: SocialContentItem[]; // 2 per week
  seoBlog: SocialContentItem; // 1 per week
  emailNewsletter: SocialContentItem; // 1 per week
  gbpUpdate: SocialContentItem; // 1 per week
}
