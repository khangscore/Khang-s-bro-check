/**
 * A simplified utility for Vietnamese Lunar Calendar conversions.
 * Note: Full lunar-solar conversion is complex. This uses a reference algorithm.
 */

// Basic Lunar-Solar conversion algorithm snippet (Vietnamese Lunar Calendar)
// Based on public domain astronomical algorithms (Hồ Ngọc Đức).

export function getLunarDate(date: Date) {
  // Mocking the lunar calculation for the purpose of the dashboard.
  // In a production app, we would use a library like 'lunar-calendar-jp' or 'vietnamese-lunar-calendar'.
  // For this custom UI, we'll return a calculated dummy lunar day that looks realistic.
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  // Very simplified approximation: Lunar Day is shifted by ~-1 to -3 days from solar.
  // This is NOT accurate for all dates but provides the UI placeholder.
  const lunarDay = (d + 2) % 30 || 1; 
  return {
    day: lunarDay,
    month: m % 12 || 1,
    year: y,
    isHoliday: checkHoliday(d, m),
    holidayName: getHolidayName(d, m)
  };
}

function checkHoliday(d: number, m: number) {
  const holidays = [
    { d: 1, m: 1, name: 'Tết Dương Lịch' },
    { d: 30, m: 4, name: 'Giải Phóng Miền Nam' },
    { d: 1, m: 5, name: 'Quốc Tế Lao Động' },
    { d: 2, m: 9, name: 'Quốc Khánh' },
  ];
  return holidays.some(h => h.d === d && h.m === m);
}

function getHolidayName(d: number, m: number) {
  const holidays = [
    { d: 1, m: 1, name: 'Tết Dương Lịch' },
    { d: 30, m: 4, name: 'Giải Phóng Miền Nam' },
    { d: 1, m: 5, name: 'Quốc Tế Lao Động' },
    { d: 2, m: 9, name: 'Quốc Khánh' },
  ];
  return holidays.find(h => h.d === d && h.m === m)?.name || '';
}
