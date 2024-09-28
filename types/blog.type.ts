export type BlogStatus = "Published" | "Archived";

export type BlogType = {
  id: number;
  title: string;
  description: string;
  status: BlogStatus;
};

export type BlogResponse = {
  data: BlogType[];
  nextOffset: number | null;
  totalCount: number;
};

export type BlogFilter = { title?: string; status?: BlogStatus };
