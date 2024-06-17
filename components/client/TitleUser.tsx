"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import * as React from "react";
import TooltipUser from "./TooltipUser";
import Image from "next/image";
import { HiOutlineDotsHorizontal, HiUserAdd, HiFlag } from "react-icons/hi";
import { User } from "@/types/user.type";

type Props = {
  user?: Pick<User, "name" | "username" | "about" | "photo">;
  date: string;
};

const listAction = [
  {
    title: "Report post",
    icon: <HiFlag className="" />,
  },
  {
    title: "Follow",
    icon: <HiUserAdd className="" />,
  },
];

const animateChildren = {
  open: {
    opacity: 0,
    scale: 0,
  },
  enter: (i: number) => ({
    opacity: 1,
    scale: 1,
    transformOrigin: "top right",
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
      opacity: { duration: 0.35 },
    },
  }),
  closed: (i: number) => ({
    opacity: 0,
    scale: 0,
    transformOrigin: "top right",
    transition: {
      duration: 0.5,
      delay: 0.5 * i * 0.1,
      type: "linear",
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

const TitleUser = ({ user, date }: Props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [openAction, setOpenAction] = React.useState(false);
  const usernameRef = React.useRef<HTMLAnchorElement>(null);
  const [tooltipLeft, setTooltipLeft] = React.useState<number>(0);
  const tooltipWidth = 350; // Lebar TooltipUser yang Anda tentukan

  React.useEffect(() => {
    if (usernameRef.current) {
      const elementWidth = usernameRef.current.offsetWidth;
      const elementLeft = usernameRef.current.offsetLeft;
      const newLeft = elementLeft + (elementWidth / 2 - tooltipWidth / 2);
      setTooltipLeft(newLeft);
    }
  }, []);

  return (
    <div className="w-full flex justify-between">
      <h1 className="text-md relative">
        <Link
          href={"/"}
          className="hover:underline-offset-2 hover:underline peer"
        >
          {user?.name}
        </Link>
        <Link
          href={"/"}
          ref={usernameRef}
          onMouseEnter={() => setOpenModal(true)}
          onMouseLeave={() => setOpenModal(false)}
        >
          {" "}
          @{user?.username}
        </Link>
        <span className="pl-1 border-l-2 border-l-slate-700 ml-2"> {date}</span>
        <AnimatePresence>
          {openModal && (
            <TooltipUser
              style={{ left: `${tooltipLeft}px` }}
              className={`top-8 w-[${tooltipWidth}px] hidden lg:block z-10`}
              onMouseEnter={() => setOpenModal(true)}
              onMouseLeave={() => setOpenModal(false)}
            >
              <article className="w-full h-full p-5 flex flex-col gap-6">
                <div className="flex justify-between">
                  <Image
                    src={user?.photo ? user.photo : "/profile.jpg"}
                    alt="Profile"
                    width={70}
                    height={70}
                    className="cursor-pointer rounded-full"
                  />
                  <button className="bg-white text-black self-start px-6 py-3 rounded-full font-bold">
                    Follow
                  </button>
                </div>
                <div className="w-full flex flex-col ">
                  <h3>{user?.name}</h3>
                  <p className="text-gray-400">@{user?.username}</p>
                </div>
                <p>{user?.about}</p>
                <div className="flex justify-evenly">
                  <p>
                    60 <span className="text-gray-400">Following</span>
                  </p>
                  <p>
                    500 <span className="text-gray-400">Followers</span>
                  </p>
                </div>
              </article>
            </TooltipUser>
          )}
        </AnimatePresence>
      </h1>
      <div className="relative">
        <HiOutlineDotsHorizontal
          className="text-gray-400 h-7 w-7 cursor-pointer"
          onClick={() => setOpenAction((prev) => !prev)}
        />
        <AnimatePresence>
          {openAction && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                transformOrigin: "top right",
                transition: {
                  duration: 0.3,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              className="p-5 flex flex-col gap-3 text-lg text-nowrap bg-black absolute right-4 rounded-lg top-3 z-10"
            >
              {listAction.map((action, i) => (
                <motion.li
                  key={i}
                  variants={animateChildren}
                  initial="open"
                  animate="enter"
                  exit="closed"
                  custom={i}
                  // onClick={() => console.log(index)}
                  className="flex gap-2 items-center"
                >
                  {action.icon} {action.title}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TitleUser;
