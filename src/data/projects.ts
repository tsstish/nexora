export type Project = {
  name: string;
  type: string;
  description: string;
  tags: string[];
  url: string;
  screenshot: string;
  estimatedPrice: number;
};

export const projects: Project[] = [
  {
    name: "MovePro Israel",
    type: "Лендинг для компании по переездам",
    description: "Услуги, география и этапы переезда — с короткой формой обращения в WhatsApp.",
    tags: ["Индивидуальный дизайн", "Лендинг", "WhatsApp"],
    url: "https://moveproisrael.online/",
    screenshot: "/projects/movepro.jpg",
    // Оценка аналогичного проекта, не фактически оплаченный счёт.
    estimatedPrice: 5500,
  },
];
