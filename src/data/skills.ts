export interface Skill {
  name: string;
  icon: string; // key used by the ICON_MAP in Skills.tsx
}

export const programmingLanguages: Skill[] = [
  { name: "HTML", icon: "html" },
  { name: "CSS", icon: "css" },
  { name: "Python", icon: "python" },
  { name: "SQL", icon: "sql" },
  { name: "Java Fundamentals", icon: "java" },
];

export const technicalTools: Skill[] = [
  { name: "NGINX", icon: "nginx" },
  { name: "MySQL", icon: "mysql" },
  { name: "Power BI", icon: "powerbi" },
  { name: "Microsoft Excel", icon: "excel" },
  { name: "Windows Troubleshooting", icon: "windows" },
  { name: "Linux (Basics)", icon: "linux" },
];
