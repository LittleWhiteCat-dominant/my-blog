import {
  contact,
  css,
  express,
  git,
  github,
  html,
  javascript,
  linkedin,
  mongodb,
  motion,
  mui,
  nextjs,
  nodejs,
  react,
  redux,
  sass,
  snapgram,
  tailwindcss,
  typescript,
  deli,
  deliprint,
  eplus,
  oneplus,
  huawei,
  android,
  java,
  kotlin,
  docker,
  neoway,
} from "@/public/assets/icons/index";

export const skills = [
  {
    imageUrl: javascript,
    name: "JavaScript",
    type: "Frontend",
  },
  {
    imageUrl: html,
    name: "HTML",
    type: "Frontend",
  },
  {
    imageUrl: css,
    name: "CSS",
    type: "Frontend",
  },
  {
    imageUrl: typescript,
    name: "TypeScript",
    type: "Frontend",
  },
  {
    imageUrl: sass,
    name: "Sass",
    type: "Frontend",
  },
  {
    imageUrl: android,
    name: "Android",
    type: "Mobile",
  },
  {
    imageUrl: java,
    name: "Java",
    type: "Mobile",
  },
  {
    imageUrl: kotlin,
    name: "Kotlin",
    type: "Mobile",
  },
  {
    imageUrl: react,
    name: "React",
    type: "Frontend",
  },
  {
    imageUrl: redux,
    name: "Redux",
    type: "State Management",
  },
  {
    imageUrl: nodejs,
    name: "Node.js",
    type: "Backend",
  },
  {
    imageUrl: nextjs,
    name: "Next.js",
    type: "Frontend",
  },
  {
    imageUrl: tailwindcss,
    name: "Tailwind CSS",
    type: "Frontend",
  },
  {
    imageUrl: express,
    name: "Express",
    type: "Backend",
  },
  {
    imageUrl: mongodb,
    name: "MongoDB",
    type: "Database",
  },
  {
    imageUrl: motion,
    name: "Motion",
    type: "Animation",
  },
  {
    imageUrl: docker,
    name: "Docker",
    type: "Backend",
  },
  {
    imageUrl: git,
    name: "Git",
    type: "Version Control",
  },
  {
    imageUrl: github,
    name: "GitHub",
    type: "Version Control",
  },
];

export const experiences = [
  {
    title: "OEM Phone Developer",
    company_name: "Neoway",
    icon: neoway,
    iconBg: "#accbe1",
    date: "September 2014 - June 2015",
    points: [
      "Enhancing user experiences by fixing bugs in the SMS application for Android smartphones.",
    ],
  },
  {
    title: "Android ROM Developer",
    company_name: "Oneplus",
    icon: oneplus,
    iconBg: "#fbc3bc",
    date: "July 2015 - June 2017",
    points: [
      "Implemented/Debugged over 100 features, utilizing debug tools and CPU Profiler to fix issues such as OOM.",
    ],
  },
  {
    title: "Android Developer",
    company_name: "Deli Group",
    icon: deli,
    iconBg: "#b7e4c7",
    date: "July 2022 - August 2021",
    points: [
      "Built the Deli e+ Android application from scratch, employing techniques such as MVVM, RxJava, Retrofit, Screen Adaptation, Local Cache, Custom View, Modularization and Componentization, and REST.",
      "Developed a robust suite of intelligent office solutions, enabling the management of office devices through Bluetooth, WIFI, Socket, and various sensors.",
      "Led efforts to ensure application compatibility with major Android OS upgrades, taking responsibility for guiding the technical direction and overcoming challenging issues in Android development.",
    ],
  },
  {
    title: "Web Developer & React Native Developer",
    company_name: "Deli Group.",
    icon: deli,
    iconBg: "#a2d2ff",
    date: "September 2021 - August 2023",
    points: [
      "Led a team in the development of a high-performance printing application using ReactNative and Plugins.",
      "Created Android APIs for ReactNative, incorporating OpenCV and LibJpeg for image compression and optimiztion.",
      "Implemented encryption for messages during the transmission of print data.",
      "Developed web applications using React.js, React Hooks, MobX, TypeScript, REST other related technologies.",
      "Collaborated with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Provided part of back-end service using NodeJs, converting HTML to PDF.",
      "Participated in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

export const socialLinks = [
  {
    name: "Contact",
    iconUrl: contact,
    link: "/contact",
  },
  {
    name: "GitHub",
    iconUrl: github,
    link: "https://github.com/YourGitHubUsername",
  },
  {
    name: "LinkedIn",
    iconUrl: linkedin,
    link: "https://www.linkedin.com/in/YourLinkedInUsername",
  },
];

export const projects = [
  {
    iconUrl: eplus,
    theme: "btn-back-red",
    name: "Deli Eplus APP",
    description:
      "Established the Deli EPlus platform from scratch, overseeing continuous enhancement over three years. The platform has successfully served over 30 million users, generating a stable monthly profit of 300,000 RMB. The platform enables add and manage office devices which connects to the MQTT-based cloud.",
    link: "https://www.delicloud.com/",
  },
  {
    iconUrl: huawei,
    theme: "btn-back-green",
    name: "Huawei Print Plugin",
    description:
      "Developed the ReactNative mobile application for Deli, in collaboration with Huawei, specifically for inkjet printer. Led team of 12 developed a cross-platform app, inclusive of LAN and cloud printing, serving millions of users.",
    link: "https://apps.apple.com/cn/app/%E5%8D%8E%E4%B8%BA%E6%99%BA%E6%85%A7%E7%94%9F%E6%B4%BB/id1266194141",
  },
  {
    iconUrl: deliprint,
    theme: "btn-back-blue",
    name: "Deli Print App",
    description:
      "Implemented the website and mini-program for Deli Printing, with the goal of providing users with a convenient and swift printing experience.",
    link: "https://play.google.com/store/apps/details?id=com.delicloud.print.global&hl=en_US",
  },
  {
    iconUrl: "/assets/icons/snapgram.svg",
    theme: "btn-back-pink",
    name: "Deli Print Mini-Program",
    description:
      "Implemented the website and mini-program for Deli Printing, with the goal of providing users with a convenient and swift printing experience.",
    link: "https://sj.qq.com/appdetail/wxf8877c45bbb4287e",
  },
  {
    iconUrl: oneplus,
    theme: "btn-back-yellow",
    name: "One Plus 3 & 2",
    description:
      "Optimized application performance through various aspects such as memory consumption, open speed, power consumption, and sliding performance.",
    link: "https://www.oneplus.com/",
  },
  {
    iconUrl: neoway,
    theme: "btn-back-black",
    name: "Neoway OEM Phone",
    description:
      "Developed the Neoway OEM phone, including features for MMS, Contact and Phone App",
    link: "https://www.neoway.com/",
  },
];
