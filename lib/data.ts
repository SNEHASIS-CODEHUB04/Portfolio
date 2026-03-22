export const projects = [
  {
    title: "GUIDEX AI",
    description:
      "An AI-powered career guidance platform that analyzes user profiles and skills to generate personalized career paths, quizzes, and improvement recommendations using Gemini AI. (Final Year Project — Ongoing)",
    tags: ["Next.js", "Prisma ORM", "Gemini AI", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/SNEHASIS-CODEHUB04",
    live: null,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  },
  {
    title: "IdeaScape",
    description:
      "A full-stack blog web application where users can create and manage their own blog posts. Built with React.js on the frontend and Appwrite as the backend service and database provider.",
    tags: ["React", "JavaScript", "Appwrite", "Tailwind CSS"],
    github: "https://github.com/SNEHASIS-CODEHUB04/IdeaScape",
    live: null,
    image: "https://i.ytimg.com/vi/tlTdbc5byAs/maxresdefault.jpg",
  },
  {
    title: "Collab Board",
    description:
      "An interactive collaborative tutorial board for seamless learning and knowledge sharing. Ideal for remote classrooms and group projects — teachers and students work together visually and textually in one platform.",
    tags: ["React", "JavaScript", "Node.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/SNEHASIS-CODEHUB04/Collab-Board",
    live: null,
    image: "https://content-management-files.canva.com/97f6f64a-d890-455f-b31b-4bd94900822f/0001.png",
  },
  {
    title: "AI Article Summarizer",
    description:
      "A Chrome Extension that leverages AI to generate quick, accurate summaries of web content directly within your browser, boosting reading productivity.",
    tags: ["JavaScript", "HTML", "CSS", "AI API"],
    github: "https://github.com/SNEHASIS-CODEHUB04/AI-ARTICLE-SUMMARISER",
    live: null,
    image: "https://www.summarizer.org/storage/2025/Oct/AISummarizerRevie_89.jpeg",
  },
  {
    title: "Sorting Visualizer",
    description:
      "An educational tool that visualizes sorting algorithms — Bubble, Insertion, Selection, Merge, and Quick Sort — by animating bars representing array values step-by-step.",
    tags: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/SNEHASIS-CODEHUB04/Sorting_Visualizer",
    live: null,
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20200622003313/Screenshot-from-2020-06-22-00-28-06.png",
  },
  {
    title: "Banker's Algorithm Simulator",
    description:
      "Simulates the Banker's Algorithm for deadlock avoidance in operating systems, allowing users to input processes and resources to visualize safe states and resource allocation.",
    tags: ["JavaScript", "HTML", "CSS", "Algorithms"],
    github: "https://github.com/SNEHASIS-CODEHUB04/Bankers_Algo_Simulator",
    live: null,
    image: "https://static.afteracademy.com/images/what-is-bankers-algorithm-banner-c3a6adf38611e0f9.png",
  },
];

export type SkillCategory = "Frontend" | "Backend" | "Database" | "DevOps & Tools" | "Languages" | "Testing";

export const skills: { name: string; icon: string; category: SkillCategory }[] = [
  // Frontend
  { name: "HTML", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/html5/html5-original.svg", category: "Frontend" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/css3/css3-original.svg", category: "Frontend" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/javascript/javascript-original.svg", category: "Frontend" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/typescript/typescript-original.svg", category: "Frontend" },
  { name: "React", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/react/react-original.svg", category: "Frontend" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/nextjs/nextjs-original.svg", category: "Frontend" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/tailwindcss/tailwindcss-plain.svg", category: "Frontend" },
  // Backend
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/nodejs/nodejs-original.svg", category: "Backend" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/express/express-original.svg", category: "Backend" },
  { name: "NestJS", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/nestjs/nestjs-plain.svg", category: "Backend" },
  { name: "Swagger", icon: "https://cdn.jsdelivr.net/npm/devicon@latest/icons/swagger/swagger-original.svg", category: "Backend" },
  { name: "Kafka", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/apachekafka/apachekafka-original.svg", category: "Backend" },
  // Database
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/mongodb/mongodb-original.svg", category: "Database" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/mysql/mysql-original.svg", category: "Database" },
  { name: "Prisma ORM", icon: "https://cdn.jsdelivr.net/npm/devicon@latest/icons/prisma/prisma-original.svg", category: "Database" },
  { name: "TypeORM", icon: "https://cdn.simpleicons.org/typeorm/E83524", category: "Database" },
  // DevOps & Tools
  { name: "Docker", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/docker/docker-original.svg", category: "DevOps & Tools" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/git/git-original.svg", category: "DevOps & Tools" },
  // Testing
  { name: "Manual Testing", icon: "https://cdn.simpleicons.org/testinglibrary/E33332", category: "Testing" },
  { name: "Jira", icon: "https://cdn.simpleicons.org/jira/0052CC", category: "Testing" },
  // Languages
  { name: "Python", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/python/python-original.svg", category: "Languages" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/java/java-original.svg", category: "Languages" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/cplusplus/cplusplus-original.svg", category: "Languages" },
  { name: "C", icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/c/c-original.svg", category: "Languages" },
];

export const services = [
  {
    title: "Full-Stack Development",
    description:
      "I build complete web applications from frontend to backend using modern frameworks and scalable architectures.",
    items: ["01 Frontend Development", "02 Backend Development", "03 Database Design"],
  },
  {
    title: "UI / UX & Design",
    description:
      "I design clean, user-friendly interfaces that focus on usability, consistency, and modern visuals.",
    items: ["01 UI Design", "02 Visual Design", "03 Motion & Media"],
  },
  {
    title: "Problem Solving",
    description:
      "Hands-on experience solving real-world algorithmic problems and building tools that make developers' lives easier.",
    items: ["01 Data Structures", "02 Algorithms", "03 System Design"],
  },
];

export const experience = [
  {
    period: "Jan 2026 – Present",
    role: "Full Stack Development Intern",
    company: "Vara Infrovate Pvt. Ltd.",
    type: "On-Site",
    description:
      "Building and maintaining web applications using modern frameworks. Gaining hands-on industry experience in agile workflows and production-grade codebases.",
    logo: "https://static.wixstatic.com/media/b6b3c9_8211f6d81cfd474c880e6bbcb82055ea~mv2.webp/v1/fill/w_108,h_88,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Vara-Logo.webp",
  },
];

export const education = [
  {
    period: "2022 – 2026",
    degree: "B.Tech — Computer Science & Engineering",
    institution: "Kalyani Government Engineering College, Kalyani",
    detail: "CGPA: 8.70",
    description:
      "Focused on full-stack development, DSA, DBMS, OOP, Computer Networks, and Cyber Security. Solved 400+ problems on LeetCode (Max Rating: 1481) and competed on CodeChef (Max Rating: 1366).",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWbwQChpVDAIt2sPfhh2upB3Q-4J9-sFLrxg&s",
  },
  {
    period: "2021 – 2022",
    degree: "Higher Secondary — Science (WBCHSE)",
    institution: "Kirnahar Shib Chandra High School, Kirnahar",
    detail: "Percentage: 96.20%",
    description: "Specialized in Mathematics, Physics, Chemistry & Biology.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPOTCGJwPq0Qf4ELnBVeaL_PUm_ir7VMiApg&s",
  },
  {
    period: "2019 – 2020",
    degree: "Secondary Education (WBBSE)",
    institution: "Kirnahar Shib Chandra High School, Kirnahar",
    detail: "Percentage: 93.85%",
    description:
      "Actively participated in extracurricular activities — sports, quizzes, and art competitions.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPOTCGJwPq0Qf4ELnBVeaL_PUm_ir7VMiApg&s",
  },
];

export const social = [
  { label: "GitHub", href: "https://github.com/SNEHASIS-CODEHUB04" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/snehasis-dutta-506115254" },
  { label: "Twitter", href: "https://x.com/SynnDutt04" },
  { label: "Email", href: "mailto:sdutta04.kir@gmail.com" },
];

export const roles = [
  "Full Stack Developer",
  "Bug Bounty Hunter",
  "Problem Solver",
  "Open Source Enthusiast",
];
