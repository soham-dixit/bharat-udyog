import axios from "axios";
import * as cheerio from "cheerio";

async function getUpcomingFestivals(
  year = new Date().getFullYear(),
  monthsToLookAhead = 2
) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = new Date().getMonth();
  const festivalResults = {};

  try {
    const url = `https://panchang.astrosage.com/calendars/indiancalendar?language=en&date=${year}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $("table").each((index, table) => {
      const monthName = $(table).find("thead th").first().text().split(" ")[0];
      const monthIndex = months.indexOf(monthName);

      // Adjust logic to handle year rollover for December/January
      const isTargetMonth =
        monthIndex === currentMonth ||
        monthIndex === (currentMonth + 1) % 12 ||
        (currentMonth === 11 && monthIndex === 0);

      if (isTargetMonth) {
        const festivalsThisMonth = [];

        $(table)
          .find("tbody tr")
          .each((i, row) => {
            const columns = $(row).find("td");
            if (columns.length >= 2) {
              const dateInfo = $(columns[0]).text().trim().split(" ");
              const festivalName = $(columns[1]).text().trim();

              if (dateInfo.length >= 2 && festivalName) {
                festivalsThisMonth.push({
                  date: dateInfo[0],
                  day: dateInfo[1],
                  name: festivalName,
                });
              }
            }
          });

        festivalResults[monthName] = festivalsThisMonth;
      }
    });

    return festivalResults;
  } catch (error) {
    console.error("Error fetching festivals:", error);
    return {};
  }
}

export { getUpcomingFestivals };
