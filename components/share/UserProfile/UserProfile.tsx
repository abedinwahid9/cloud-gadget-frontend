"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { RiLoginCircleFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { userIcons } from "@/components/Navbar/MainNav";
import { getAuthMe } from "@/lib/redux/auth/authThunks";

const UserProfile = () => {
  // const userIcons: string = "w-7 h-7 text-secondary hover:text-nav";
  const menuItemclassName =
    "group relative text-md font-semibold transition-colors duration-300 hover:text-secondary";
  const underlineclassName =
    "absolute left-0 -bottom-1 h-[2px] w-0 bg-nav transition-all duration-300 group-hover:w-full";
  const { user } = useAppSelector((state) => state.authSlices);
  const axiosPublic = useAxiosPublic();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    const res = await axiosPublic.get("/auth/logout");
    if (res.status === 203) {
      dispatch(getAuthMe());
    }
  };

  return (
    <>
      {!user ? (
        <Link href="/login">
          <RiLoginCircleFill
            className={`${userIcons}  group-data-[state=open]:text-nav`}
          />
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none group cursor-pointer flex items-center ">
            <FaUserAlt
              className={`${userIcons} group-data-[state=open]:text-nav`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end" // aligns to the left of trigger
            sideOffset={15} // offset from the trigger (downward)
            className="bg-primary/85 backdrop:blur-xl border-none text-secondary "
          >
            <DropdownMenuLabel className="font-bold">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/my-account">
              <DropdownMenuItem className={menuItemclassName}>
                <span className="relative">
                  Profile
                  <span className={underlineclassName} />
                </span>
              </DropdownMenuItem>
            </Link>
            {user?.role === "ADMIN" && (
              <Link href="/admin" prefetch={true}>
                <DropdownMenuItem className={menuItemclassName}>
                  <span className="relative">
                    Dashboard
                    <span className={underlineclassName} />
                  </span>
                </DropdownMenuItem>
              </Link>
            )}

            <DropdownMenuItem className={menuItemclassName}>
              <button onClick={handleLogout} className="relative">
                logout
                <span className={underlineclassName} />
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default UserProfile;
