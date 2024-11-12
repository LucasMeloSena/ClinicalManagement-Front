import { Dayjs } from "dayjs";

interface GeneratedDate {
  startAt: Date;
  endAt: Date;
}

export function generateDate(
  date: Date,
  start: Dayjs,
  end: Dayjs,
): GeneratedDate {
  const startTime = start.toDate();
  const endTime = end.toDate();
  const startAt = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    startTime.getHours(),
    startTime.getMinutes(),
  );
  const endAt = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    endTime.getHours(),
    endTime.getMinutes(),
  );

  return { startAt, endAt };
}
