interface ScheduleCardProps {
  day: string;
  title: string;
  subtitle: string;
  date: string;
  type: string;
  image: string;
  onViewPoster?: () => void;
}

export default function DswScheduleCard({
  day,
  title,
  subtitle,
  date,
  type = "FULL DAY",
  image,
  onViewPoster,
}: ScheduleCardProps) {
  return (
    <div className="relative aspect-[504/591] w-full max-w-[504px] overflow-hidden rounded-[18px] bg-[#071522] text-white shadow-custom border-t border-[var(--highlight)]">
      
      <img
        src={image}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="
          absolute inset-0 bg-gradient-to-b
          from-[#03101c]/5
          via-[#03101c]/40
          via-20%
          to-[#03101c]/95"
      />

      <div className="
        absolute 
        m-4 px-4 py-2
        text-sm font-extrabold
        rounded-full bg-[#162b3e]/90"
      >
        {date}
      </div>

      <div 
        className="
          absolute right-4 top-4 
          px-4 py-2
          text-sm font-extrabold
          rounded-full bg-[color-mix(in_srgb,var(--success)_80%,transparent)]"
      >
        {type}
      </div>

      <div className="absolute bottom-6 left-4 right-4">

        <div className="
          mb-4 
          text-sm font-extrabold uppercase text-[var(--bg)]"
        >
          {day}
        </div>

        <h2 className="
          mb-4 text-[clamp(28px,6vw,39px)] font-extrabold leading-[0.98]"
        >
          {title}
        </h2>

        <p className="max-w-[95%] text-base font-medium leading-[1.55] text-white/80">
          {subtitle}
        </p>

          <button
            type="button"
            onClick={onViewPoster}
            className="
              mt-5
              rounded-full
              bg-white/90
              px-5 py-2.5
              text-sm
              font-bold
              text-[var(--text)]
              transition
            "
          >
            View Schedule
          </button>
      </div>
    </div>
  );
}