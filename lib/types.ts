export type Topic = {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  content_ar: string | null;
  content_en: string | null;
  created_at: string;
  updated_at: string;
};

export type Video = {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string | null;
  description_en: string;
  video_url: string;
  thumbnail_url: string | null;
  topic: string;
  duration: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};
