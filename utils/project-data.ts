import { StaticImageData } from "next/image";

import ShopCo from "../images/Shop-Co.png";
import BlogSite from "../images/BlogSite.png";
import CarGage from "../images/CarGage.png";
import CafeStreet from "../images/CafeStreet.png";
import VisitNLearn from "../images/VisitNLearn.png";
import FurniroECommerce from "../images/Furniro-E-Commerce.png";
import PassGen from "../images/PassGen.png";
import PomodoroTimer from "../images/PomodoroTimer.png";


export type ProjectType = {
  name: string;
  description: string;
  longDescription?: string;
  image: StaticImageData;
  mobileImage?: StaticImageData;
  figma?: StaticImageData;
  old?: StaticImageData;
  code?: string;
  link?: string;
  slug: string;
  type: string;
};

export const projectsList: ProjectType[] = [
  {
    name: "SHOP.CO E-Commerce",
    description:
      "A fully functional e-commerce website built with Next.js, Tailwind CSS, and Stripe.",
    image: ShopCo,
    link: "https://dynamicblogs-brown.vercel.app/",
    code: "https://github.com/Sheikh-Muhammad-Mujtaba/Dec_Hackathon",
    slug: "e-commerce",
    type: "Hackathon Project",
  },
  {
    name: "Blog Site Theme",
    description:
      "A blog site theme built with Next.js, Tailwind CSS, and TypeScript.",
    image: BlogSite,
    link: "https://dynamicblogs-brown.vercel.app/",
    slug: "blog-site",
    type: "Personal Project",
  },
  {
    name: "Car Gage (Car Report) Website",
    description:
      "A Car Report website that provides users with detailed information about a car's history, including accidents, repairs, and ownership.",
    image: CarGage,
    link: "https://cargage-momin-khans-projects-c9bd88f2.vercel.app/",
    slug: "car-gage",
    type: "with Actual Size for CarGage",
  },
  {
    name: "Cafe Street Coffee Shop",
    description:
      "A coffee shop website that provides users with information about the cafe, including its menu, location, and contact details.",
    image: CafeStreet,
    link: "https://coffee-shop-ochre-five.vercel.app/",
    slug: "cafe-street",
    type: "with Actual Size for Cafe Street",
  },
  {
    name: "Visin N Learn",
    description:
      "A website for educational institutions that provides tour services for students in diffrent countries for their study abroad programs.",
    image: VisitNLearn,
    link: "https://studynlearn.vercel.app/",
    slug: "study-abroad",
    type: "with Actual Size for Visin N Learn",
  },
  {
    name: "Furniro E-Commerce UI",
    description:
      "A UI for an e-commerce website that provides users with a seamless shopping experience. Using core HTML, CSS, and JavaScript.",
    image: FurniroECommerce,
    link: "https://htms-css-ui-design.vercel.app/",
    slug: "furniro-e-commerce",
    type: "Personal Project",
  },
  {
    name: "Password Generator Widget",
    description:
      "A password generator widget that allows users to generate secure passwords with customizable options.",
    image: PassGen,
    link: "https://nextjs-password-genrator-app.vercel.app/",
    code: "https://github.com/Sheikh-Muhammad-Mujtaba/nextjs-password_genrator-app",
    slug: "password-generator",
    type: "Personal Project",
  },
  {
    name: "Pomodoro Timer Widget",
    description:
      "A Pomodoro timer widget that helps users manage their time effectively by using the Pomodoro technique.",
    image: PomodoroTimer,
    link: "https://pomodoro-timer-app-alpha.vercel.app/",
    code: "https://github.com/Sheikh-Muhammad-Mujtaba/pomodoro_timer-app",
    slug: "pomodoro-timer",
    type: "Personal Project",
  },
 
];
