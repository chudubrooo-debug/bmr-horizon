// ===== Attendance Module Data Models & Mock Data =====

export interface HospitalLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  radiusMeters: number; // geofence radius
}

export interface ShiftConfig {
  id: string;
  name: string;
  startTime: string; // "09:00"
  endTime: string;   // "18:00"
  graceMinutes: number;
  halfDayThresholdHours: number;
  autoCloseAfterHours: number;
}

export type AttendanceStatus = "present" | "late" | "half-day" | "absent";

export interface AttendanceEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  checkInLocation: { lat: number; lng: number } | null;
  checkOutLocation: { lat: number; lng: number } | null;
  hospitalId: string;
  hospitalName: string;
  deviceId: string;
  status: AttendanceStatus;
  faceVerified: boolean;
  locationVerified: boolean;
  livenessScore: number; // 0-1
}

// BMR-SMO Hospital Network with geo-coordinates
export const hospitalLocations: HospitalLocation[] = [
  {
    id: "h1",
    name: "Aster Prime Hospital",
    address: "Ameerpet, Hyderabad",
    latitude: 17.4375,
    longitude: 78.4483,
    radiusMeters: 150,
  },
  {
    id: "h2",
    name: "Renova Neelima Hospital",
    address: "Kukatpally, Hyderabad",
    latitude: 17.4947,
    longitude: 78.3996,
    radiusMeters: 120,
  },
  {
    id: "h3",
    name: "Paarthiv Lung Care Center",
    address: "Secunderabad, Hyderabad",
    latitude: 17.4399,
    longitude: 78.4983,
    radiusMeters: 100,
  },
  {
    id: "h4",
    name: "Renova Century Hospital",
    address: "Banjara Hills, Hyderabad",
    latitude: 17.4156,
    longitude: 78.4347,
    radiusMeters: 130,
  },
  {
    id: "h5",
    name: "Landmark Hospitals",
    address: "Kondapur, Hyderabad",
    latitude: 17.4600,
    longitude: 78.3548,
    radiusMeters: 140,
  },
];

export const defaultShift: ShiftConfig = {
  id: "s1",
  name: "General Shift",
  startTime: "09:00",
  endTime: "18:00",
  graceMinutes: 15,
  halfDayThresholdHours: 4,
  autoCloseAfterHours: 12,
};

// ===== Mock Attendance History =====
export const mockAttendanceHistory: AttendanceEntry[] = [
  {
    id: "a1", employeeId: "BMR-132", employeeName: "Dr. G Sridhar",
    date: "2026-04-11", checkIn: "08:45", checkOut: null,
    checkInLocation: { lat: 17.4376, lng: 78.4484 }, checkOutLocation: null,
    hospitalId: "h1", hospitalName: "Aster Prime Hospital",
    deviceId: "DEV-A1B2C3", status: "present", faceVerified: true, locationVerified: true, livenessScore: 0.97,
  },
  {
    id: "a2", employeeId: "BMR-133", employeeName: "Dr. Varshika",
    date: "2026-04-11", checkIn: "09:22", checkOut: null,
    checkInLocation: { lat: 17.4948, lng: 78.3997 }, checkOutLocation: null,
    hospitalId: "h2", hospitalName: "Renova Neelima Hospital",
    deviceId: "DEV-D4E5F6", status: "late", faceVerified: true, locationVerified: true, livenessScore: 0.94,
  },
  {
    id: "a3", employeeId: "BMR-134", employeeName: "Dr. Vijay",
    date: "2026-04-11", checkIn: "08:30", checkOut: "17:15",
    checkInLocation: { lat: 17.4157, lng: 78.4348 }, checkOutLocation: { lat: 17.4156, lng: 78.4347 },
    hospitalId: "h4", hospitalName: "Renova Century Hospital",
    deviceId: "DEV-G7H8I9", status: "present", faceVerified: true, locationVerified: true, livenessScore: 0.99,
  },
  {
    id: "a4", employeeId: "BMR-135", employeeName: "Dr. Akhila",
    date: "2026-04-11", checkIn: null, checkOut: null,
    checkInLocation: null, checkOutLocation: null,
    hospitalId: "h3", hospitalName: "Paarthiv Lung Care Center",
    deviceId: "", status: "absent", faceVerified: false, locationVerified: false, livenessScore: 0,
  },
  {
    id: "a5", employeeId: "BMR-136", employeeName: "Dr. G Praveen Kumar",
    date: "2026-04-11", checkIn: "08:50", checkOut: "13:05",
    checkInLocation: { lat: 17.4601, lng: 78.3549 }, checkOutLocation: { lat: 17.4600, lng: 78.3548 },
    hospitalId: "h5", hospitalName: "Landmark Hospitals",
    deviceId: "DEV-J1K2L3", status: "half-day", faceVerified: true, locationVerified: true, livenessScore: 0.91,
  },
  {
    id: "a6", employeeId: "BMR-137", employeeName: "Dr. P Sai Sri Harsha",
    date: "2026-04-11", checkIn: "08:30", checkOut: null,
    checkInLocation: { lat: 17.4376, lng: 78.4485 }, checkOutLocation: null,
    hospitalId: "h1", hospitalName: "Aster Prime Hospital",
    deviceId: "DEV-M4N5O6", status: "present", faceVerified: true, locationVerified: true, livenessScore: 0.96,
  },
  {
    id: "a7", employeeId: "BMR-138", employeeName: "Dr. B Krupakar",
    date: "2026-04-11", checkIn: "08:55", checkOut: null,
    checkInLocation: { lat: 17.4948, lng: 78.3998 }, checkOutLocation: null,
    hospitalId: "h2", hospitalName: "Renova Neelima Hospital",
    deviceId: "DEV-P7Q8R9", status: "present", faceVerified: true, locationVerified: true, livenessScore: 0.93,
  },
  // Historical records
  {
    id: "a8", employeeId: "BMR-132", employeeName: "Dr. G Sridhar",
    date: "2026-04-10", checkIn: "08:40", checkOut: "17:30",
    checkInLocation: { lat: 17.4376, lng: 78.4484 }, checkOutLocation: { lat: 17.4376, lng: 78.4484 },
    hospitalId: "h1", hospitalName: "Aster Prime Hospital",
    deviceId: "DEV-A1B2C3", status: "present", faceVerified: true, locationVerified: true, livenessScore: 0.98,
  },
  {
    id: "a9", employeeId: "BMR-133", employeeName: "Dr. Varshika",
    date: "2026-04-10", checkIn: "09:05", checkOut: "18:00",
    checkInLocation: { lat: 17.4948, lng: 78.3997 }, checkOutLocation: { lat: 17.4948, lng: 78.3997 },
    hospitalId: "h2", hospitalName: "Renova Neelima Hospital",
    deviceId: "DEV-D4E5F6", status: "late", faceVerified: true, locationVerified: true, livenessScore: 0.95,
  },
  {
    id: "a10", employeeId: "BMR-134", employeeName: "Dr. Vijay",
    date: "2026-04-10", checkIn: "08:28", checkOut: "17:00",
    checkInLocation: { lat: 17.4157, lng: 78.4348 }, checkOutLocation: { lat: 17.4157, lng: 78.4348 },
    hospitalId: "h4", hospitalName: "Renova Century Hospital",
    deviceId: "DEV-G7H8I9", status: "present", faceVerified: true, locationVerified: true, livenessScore: 0.97,
  },
  {
    id: "a11", employeeId: "BMR-132", employeeName: "Dr. G Sridhar",
    date: "2026-04-09", checkIn: "08:50", checkOut: "17:45",
    checkInLocation: { lat: 17.4376, lng: 78.4484 }, checkOutLocation: { lat: 17.4376, lng: 78.4484 },
    hospitalId: "h1", hospitalName: "Aster Prime Hospital",
    deviceId: "DEV-A1B2C3", status: "present", faceVerified: true, locationVerified: true, livenessScore: 0.96,
  },
  {
    id: "a12", employeeId: "BMR-135", employeeName: "Dr. Akhila",
    date: "2026-04-10", checkIn: "08:45", checkOut: "17:20",
    checkInLocation: { lat: 17.4400, lng: 78.4984 }, checkOutLocation: { lat: 17.4400, lng: 78.4984 },
    hospitalId: "h3", hospitalName: "Paarthiv Lung Care Center",
    deviceId: "DEV-S1T2U3", status: "present", faceVerified: true, locationVerified: true, livenessScore: 0.92,
  },
];

// ===== Utility Functions =====

/** Calculate distance between two GPS coordinates in meters (Haversine) */
export function getDistanceMeters(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371e3;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Check if a GPS coordinate is within a hospital's geofence */
export function isWithinGeofence(
  lat: number, lng: number,
  hospital: HospitalLocation
): { valid: boolean; distance: number } {
  const distance = getDistanceMeters(lat, lng, hospital.latitude, hospital.longitude);
  return { valid: distance <= hospital.radiusMeters, distance };
}

/** Determine attendance status based on check-in time and shift config */
export function determineStatus(
  checkInTime: string,
  checkOutTime: string | null,
  shift: ShiftConfig
): AttendanceStatus {
  const [inH, inM] = checkInTime.split(":").map(Number);
  const [shiftH, shiftM] = shift.startTime.split(":").map(Number);
  const checkInMinutes = inH * 60 + inM;
  const shiftStartMinutes = shiftH * 60 + shiftM;

  if (checkOutTime) {
    const [outH, outM] = checkOutTime.split(":").map(Number);
    const workedHours = (outH * 60 + outM - checkInMinutes) / 60;
    if (workedHours < shift.halfDayThresholdHours) return "half-day";
  }

  if (checkInMinutes > shiftStartMinutes + shift.graceMinutes) return "late";
  return "present";
}

/** Generate a pseudo device fingerprint */
export function generateDeviceId(): string {
  const nav = typeof navigator !== "undefined" ? navigator : null;
  const base = [
    nav?.userAgent?.slice(0, 20) || "UNK",
    nav?.language || "en",
    screen?.width || 0,
    screen?.height || 0,
  ].join("-");
  let hash = 0;
  for (let i = 0; i < base.length; i++) {
    hash = (hash << 5) - hash + base.charCodeAt(i);
    hash |= 0;
  }
  return `DEV-${Math.abs(hash).toString(36).toUpperCase().slice(0, 8)}`;
}

/** Format time as HH:MM */
export function formatTime(date: Date): string {
  return date.toTimeString().slice(0, 5);
}

/** Get today's date string */
export function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}
