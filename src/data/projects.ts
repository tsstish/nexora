export type Project = {
  name: string;
  type: string;
  description: string;
  tags: string[];
  url: string;
  screenshot: string;
};

export const projects: Project[] = [
  {
    name: "MovePro Israel",
    type: "Сервис перевозок по Израилю",
    description: "Понятная структура, акцент на доверие и быстрый путь к обращению.",
    tags: ["Стратегия", "UX/UI дизайн", "Разработка", "SEO"],
    url: "https://moveproisrael.online/",
    screenshot: "/projects/movepro.jpg"
  },
  {
    name: "NeXora Business OS",
    type: "Внутренняя цифровая система",
    description: "Рабочее пространство для обращений, задач, финансов и развития бизнеса.",
    tags: ["Продукт", "UX/UI", "Next.js", "Supabase"],
    url: "https://nexora-business-os.vercel.app/dashboard",
    screenshot: "/projects/business-os.jpg"
  }
];
