import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import brLocale from "@fullcalendar/core/locales/pt-br";

interface CalendarProps {
  events: {
    id: string;
    start: Date;
    end: Date;
    overlap: boolean;
  }[];
  onClick: (arg: DateClickArg) => void;
  onClickConsultation: (consultationId: string) => void;
}

export function Calendar({
  events,
  onClick,
  onClickConsultation,
}: CalendarProps) {
  return (
    <>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        weekends={true}
        events={events}
        eventClick={(e) => onClickConsultation(e.event._def.publicId)}
        dateClick={onClick}
        locale={brLocale}
        slotMinTime="06:00:00"
        slotMaxTime="24:00:00"
        allDaySlot={false}
        height={"100%"}
      />
    </>
  );
}
