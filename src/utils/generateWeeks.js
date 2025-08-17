// utils/generateWeeks.js
export function generateWeeksForYear(year) {
  const weeks = [];
  let currentDate = new Date(year, 0, 1); // Jan 1st
  let weekId = 1;

  while (currentDate.getFullYear() === year) {
    // Start date of the week
    const startOfWeek = new Date(currentDate);

    // End date = start + 6 days
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Days in this week
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);

      if (dayDate.getFullYear() !== year) break; // don't include extra days in next year

      const dayLabel = dayDate.toLocaleDateString("en-US", {
        weekday: "short", // Mon, Tue...
      });

      days.push({
        id: dayDate.toISOString().split("T")[0], // YYYY-MM-DD
        label: dayLabel,
      });
    }

    weeks.push({
      id: weekId,
      label: `Week ${weekId} (${startOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${endOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })})`,
      days,
    });

    // Move to the next week
    currentDate.setDate(currentDate.getDate() + 7);
    weekId++;
  }

  return weeks;
}
