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
  therapeutic?: string;
  sponsor?: string;
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
  { id: "1", name: "Dr. Aravind Reddy", email: "aravind@bmrsmo.com", department: "Administration", role: "Admin", employeeId: "BMR-001", status: "active", joinDate: "2016-03-15" },
  { id: "2", name: "Dr. Priya Sharma", email: "priya@bmrsmo.com", department: "Clinical Operations", role: "Clinical Manager", employeeId: "BMR-042", status: "active", joinDate: "2018-01-10" },
  { id: "3", name: "Dr. Sanjay Patel", email: "sanjay@bmrsmo.com", department: "Regulatory Affairs", role: "Regulatory Lead", employeeId: "BMR-018", status: "active", joinDate: "2017-08-22" },
  { id: "4", name: "Meera Krishnan", email: "meera@bmrsmo.com", department: "Data Management", role: "Data Analyst", employeeId: "BMR-056", status: "active", joinDate: "2020-02-14" },
  { id: "5", name: "Dr. Lakshmi Nair", email: "lakshmi@bmrsmo.com", department: "Quality Assurance", role: "QA Lead", employeeId: "BMR-033", status: "active", joinDate: "2019-06-01" },
  { id: "6", name: "Rajesh Kumar", email: "rajesh@bmrsmo.com", department: "Site Operations", role: "CRC", employeeId: "BMR-071", status: "active", joinDate: "2021-09-10" },
  { id: "7", name: "Dr. Anitha Rao", email: "anitha@bmrsmo.com", department: "Clinical Operations", role: "Principal Investigator", employeeId: "BMR-012", status: "active", joinDate: "2017-04-05" },
  { id: "8", name: "Vikram Singh", email: "vikram@bmrsmo.com", department: "Patient Recruitment", role: "Recruitment Lead", employeeId: "BMR-089", status: "active", joinDate: "2022-01-20" },
];

export const projects: Project[] = [
  { id: "1", name: "Cardiology Phase III — Anticoagulant CT-401", description: "Multi-center cardiovascular trial for novel anticoagulant compound at Aster Prime Hospital", status: "active", phase: "Phase III", assignees: ["2", "3"], startDate: "2024-01-15", endDate: "2025-06-30", progress: 65, therapeutic: "Cardiology", sponsor: "PharmaCo Global" },
  { id: "2", name: "Oncology Biomarker Validation Study", description: "Identification and validation of novel biomarkers for early-stage detection at Malla Reddy Medical College", status: "active", phase: "Phase II", assignees: ["3", "4"], startDate: "2024-03-01", endDate: "2025-03-01", progress: 40, therapeutic: "Oncology", sponsor: "BioGenix Labs" },
  { id: "3", name: "Pulmonology Safety Review NR-220", description: "Post-market safety surveillance for approved respiratory treatment at Paarthiv Lung Care Center", status: "completed", phase: "Phase IV", assignees: ["2", "5"], startDate: "2023-06-01", endDate: "2024-12-31", progress: 100, therapeutic: "Pulmonology", sponsor: "LungTech Pharma" },
  { id: "4", name: "Pediatric Vaccine Trial PV-88", description: "Efficacy and safety evaluation of next-gen pediatric respiratory vaccine at Renova Neelima Hospital", status: "on-hold", phase: "Phase I", assignees: ["3"], startDate: "2024-09-01", endDate: "2026-01-01", progress: 15, therapeutic: "Pediatrics", sponsor: "VaxGen India" },
  { id: "5", name: "Nutraceutical Efficacy Study NS-50", description: "Clinical evaluation of dietary supplement for metabolic health at Landmark Hospitals", status: "active", phase: "Phase II", assignees: ["2", "8"], startDate: "2024-06-15", endDate: "2025-04-30", progress: 52, therapeutic: "Nutraceuticals", sponsor: "NutriScience Co" },
  { id: "6", name: "Neurology Drug Trial — Migraine ND-77", description: "Phase II trial of novel CGRP inhibitor for chronic migraine at Renova Century Hospital", status: "active", phase: "Phase II", assignees: ["7", "4"], startDate: "2024-04-01", endDate: "2025-08-01", progress: 35, therapeutic: "Neurology", sponsor: "NeuroVita Labs" },
];

export const announcements: Announcement[] = [
  { id: "1", title: "USFDA Inspection Preparedness Review", content: "All sites must complete audit-readiness documentation by April 15th. Mandatory compliance check for ongoing Phase III studies.", date: "2026-04-05", priority: "high", author: "Dr. Aravind Reddy" },
  { id: "2", title: "New GCP Compliance Protocols", content: "Updated GCP protocols are now in effect across all affiliated hospitals. Please review the new documentation in the shared QMS drive.", date: "2026-04-03", priority: "high", author: "Dr. Lakshmi Nair" },
  { id: "3", title: "Patient Recruitment Target Update", content: "Cardiology CT-401 trial has reached 78% enrollment. Recruitment team to intensify efforts at Aster Prime Hospital.", date: "2026-04-02", priority: "medium", author: "Vikram Singh" },
  { id: "4", title: "NABH Re-accreditation Schedule", content: "Annual NABH compliance review scheduled for Q2 2026. All site coordinators to prepare documentation.", date: "2026-04-01", priority: "medium", author: "Dr. Sanjay Patel" },
  { id: "5", title: "Clinical Staff Training Workshop", content: "CRC training program on eCTD submission and regulatory filing scheduled for April 20th.", date: "2026-03-28", priority: "low", author: "HR Department" },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: "1", employeeId: "BMR-042", employeeName: "Dr. Priya Sharma", date: "2026-04-08", checkIn: "08:45", checkOut: "17:30", status: "present" },
  { id: "2", employeeId: "BMR-018", employeeName: "Dr. Sanjay Patel", date: "2026-04-08", checkIn: "09:15", checkOut: "18:00", status: "late" },
  { id: "3", employeeId: "BMR-056", employeeName: "Meera Krishnan", date: "2026-04-08", checkIn: "08:30", checkOut: "17:00", status: "present" },
  { id: "4", employeeId: "BMR-033", employeeName: "Dr. Lakshmi Nair", date: "2026-04-08", checkIn: "", checkOut: "", status: "absent" },
  { id: "5", employeeId: "BMR-071", employeeName: "Rajesh Kumar", date: "2026-04-08", checkIn: "08:50", checkOut: "17:15", status: "present" },
  { id: "6", employeeId: "BMR-012", employeeName: "Dr. Anitha Rao", date: "2026-04-08", checkIn: "08:30", checkOut: "18:30", status: "present" },
];

export const monthlyStats = {
  totalEmployees: 48,
  activeProjects: 12,
  completedTrials: 7,
  revenue: 2450000,
  attendanceRate: 94.5,
  pendingReviews: 5,
  recruitmentRate: 78,
  complianceScore: 98.5,
  activeSites: 6,
  totalBeds: 1390,
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
    { name: "Clinical Ops", value: 15 },
    { name: "Regulatory", value: 8 },
    { name: "Data Mgmt", value: 6 },
    { name: "QA", value: 5 },
    { name: "Site Ops", value: 9 },
    { name: "Recruitment", value: 5 },
  ],
  phaseDistribution: [
    { name: "Phase I", value: 2 },
    { name: "Phase II", value: 5 },
    { name: "Phase III", value: 3 },
    { name: "Phase IV", value: 2 },
  ],
  recruitmentTrend: [
    { month: "Jan", target: 40, actual: 35 },
    { month: "Feb", target: 50, actual: 48 },
    { month: "Mar", target: 60, actual: 55 },
    { month: "Apr", target: 70, actual: 68 },
    { month: "May", target: 80, actual: 75 },
    { month: "Jun", target: 90, actual: 85 },
  ],
  complianceMetrics: [
    { name: "GCP Compliance", score: 98 },
    { name: "Protocol Adherence", score: 96 },
    { name: "Documentation", score: 99 },
    { name: "Safety Reporting", score: 100 },
  ],
};
