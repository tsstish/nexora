/* Approved New York atmosphere series — same geometry across four photos.
   Assets are supplied separately as /public/cities/new-york/*.webp. */
export const CITY_OPTIONS = ["new-york"] as const;
export type CityId = typeof CITY_OPTIONS[number];
export type DayPhase = "morning" | "day" | "sunset" | "night";
export const DAY_PHASE_LABELS: Record<DayPhase,string> = {
  morning:"Утро", day:"День", sunset:"Закат", night:"Ночь",
};
export const CITY_ASSETS: Record<CityId, {
  label:string;
  morning:string;
  day:string;
  sunset:string;
  night:string;
  focalDesktop:string;
  focalMobile:string;
}> = {
  "new-york": {
    label:"Нью-Йорк",
    morning:"/cities/new-york/new-york-morning.webp",
    day:"/cities/new-york/new-york-day.webp",
    sunset:"/cities/new-york/new-york-sunset.webp",
    night:"/cities/new-york/new-york-night.webp",
    focalDesktop:"50% 43%",
    focalMobile:"50% 43%",
  },
};
/** Artistic local-time phases, not astronomical sunrise and sunset. */
export function phaseForLocalMinutes(minutes:number):DayPhase{
  if(minutes>=5*60 && minutes<10*60+30)return "morning";
  if(minutes>=10*60+30 && minutes<16*60+30)return "day";
  if(minutes>=16*60+30 && minutes<19*60+30)return "sunset";
  return "night";
}
export function phaseForVisitorClock(date:Date):DayPhase{
  return phaseForLocalMinutes(date.getHours()*60+date.getMinutes());
}
