export interface Job {
  id: number;
  recruiter: number;
  title: string;
  company: string;
  description: string;
  required_skills: string[];
  location: string;
  created_at: string;
  updated_at: string;
}