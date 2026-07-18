export interface Analysis {
  id: number;
  resume: number;
  candidate: number;
  candidate_name: string;
  job: number;
  job_title: string;
  resume_file: string;
  extracted_skills: string[];
  missing_skills: string[];
  match_score: string | number;
  recommendation: string;
  recommendations: string[];
  summary: string;
  uploaded_at: string;
  created_at: string;
}
