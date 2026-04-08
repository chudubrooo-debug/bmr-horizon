export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  employeeId: string;
  status: "active" | "inactive";
  joinDate: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  phase: string;
  assignees: string[];
  startDate: string;
  endDate: string;
  progress: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: "high" | "medium" | "low";
  author: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "present" | "absent" | "late";
}

export const employees: Employee[] = [
  { id: "1", name: "Dr. Sarah Mitchell", email: "sarah@bmr.com", department: "Administration", role: "Admin", employeeId: "BMR-001", status: "active", joinDate: "2021-03-15" },
  { id: "2", name: "Dr. James Wilson", email: "james@bmr.com", department: "Clinical Trials", role: "Senior Researcher", employeeId: "BMR-042", status: "active", joinDate: "2022-01-10" },
  { id: "3", name: "Dr. Emily Chen", email: "emily@bmr.com", department: "Pharmacology", role: "Lead Scientist", employeeId: "BMR-018", status: "active", joinDate: "2021-08-22" },
  { id: "4", name: "Mark Thompson", email: "mark@bmr.com", department: "Data Analysis", role: "Data Analyst", employeeId: "BMR-056", status: "active", joinDate: "2023-02-14" },
  { id: "5", name: "Dr. Lisa Park", email: "lisa@bmr.com", department: "Regulatory Affairs", role: "Compliance Officer", employeeId: "BMR-033", status: "active", joinDate: "2022-06-01" },
  { id: "6", name: "Robert Adams", email: "robert@bmr.com", department: "Lab Operations", role: "Lab Technician", employeeId: "BMR-071", status: "inactive", joinDate: "2023-09-10" },
];

export const projects: Project[] = [
  { id: "1", name: "Phase III - Cardio Drug CT-401", description: "Multi-center cardiovascular trial for new anticoagulant compound CT-401", status: "active", phase: "Phase III", assignees: ["2", "3"], startDate: "2024-01-15", endDate: "2025-06-30", progress: 65 },
  { id: "2", name: "Oncology Biomarker Study", description: "Identification and validation of novel biomarkers for early-stage lung cancer detection", status: "active", phase: "Phase II", assignees: ["3", "4"], startDate: "2024-03-01", endDate: "2025-03-01", progress: 40 },
  { id: "3", name: "Neurology Safety Review", description: "Post-market safety surveillance for approved neurological treatment NR-220", status: "completed", phase: "Phase IV", assignees: ["2", "5"], startDate: "2023-06-01", endDate: "2024-12-31", progress: 100 },
  { id: "4", name: "Pediatric Vaccine Trial PV-88", description: "Efficacy and safety evaluation of next-generation pediatric respiratory vaccine", status: "on-hold", phase: "Phase I", assignees: ["3"], startDate: "2024-09-01", endDate: "2026-01-01", progress: 15 },
];

export const announcements: Announcement[] = [
  { id: "1", title: "Q2 Research Review Meeting", content: "All department heads are required to attend the quarterly research review on April 15th at 10:00 AM in Conference Room A.", date: "2026-04-05", priority: "high", author: "Dr. Sarah Mitchell" },
  { id: "2", title: "New Lab Safety Protocols", content: "Updated biosafety protocols are now in effect. Please review the new documentation in the shared drive.", date: "2026-04-03", priority: "medium", author: "Dr. Lisa Park" },
  { id: "3", title: "Employee Wellness Program", content: "BMR is launching a new wellness initiative. Free health screenings available next week.", date: "2026-04-01", priority: "low", author: "HR Department" },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: "1", employeeId: "BMR-042", employeeName: "Dr. James Wilson", date: "2026-04-08", checkIn: "08:45", checkOut: "17:30", status: "present" },
  { id: "2", employeeId: "BMR-018", employeeName: "Dr. Emily Chen", date: "2026-04-08", checkIn: "09:15", checkOut: "18:00", status: "late" },
  { id: "3", employeeId: "BMR-056", employeeName: "Mark Thompson", date: "2026-04-08", checkIn: "08:30", checkOut: "17:00", status: "present" },
  { id: "4", employeeId: "BMR-033", employeeName: "Dr. Lisa Park", date: "2026-04-08", checkIn: "", checkOut: "", status: "absent" },
];

export const monthlyStats = {
  totalEmployees: 48,
  activeProjects: 12,
  completedTrials: 7,
  revenue: 2450000,
  attendanceRate: 94.5,
  pendingReviews: 5,
};

export const chartData = {
  projectProgress: [
    { month: "Jan", trials: 4, completed: 1 },
    { month: "Feb", trials: 5, completed: 1 },
    { month: "Mar", trials: 6, completed: 2 },
    { month: "Apr", trials: 7, completed: 2 },
    { month: "May", trials: 8, completed: 3 },
    { month: "Jun", trials: 8, completed: 4 },
  ],
  departmentDistribution: [
    { name: "Clinical Trials", value: 15 },
    { name: "Pharmacology", value: 10 },
    { name: "Data Analysis", value: 8 },
    { name: "Regulatory", value: 6 },
    { name: "Lab Ops", value: 9 },
  ],
};
