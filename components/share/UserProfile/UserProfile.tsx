import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { FaUserAlt } from "react-icons/fa";

const UserProfile = () => {
  const userIcons: string = "w-6 h-6 text-secondary hover:text-nav";
  const menuItemclassName =
    "group relative text-md font-semibold transition-colors duration-300 hover:text-secondary";
  const underlineclassName =
    "absolute left-0 -bottom-1 h-[2px] w-0 bg-nav transition-all duration-300 group-hover:w-full";

  return (
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
        className="bg-primary/95 border-none text-secondary "
      >
        <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={menuItemclassName}>
          <Link href="/my-account">
            <span className="relative">
              Profile
              <span className={underlineclassName} />
            </span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className={menuItemclassName}>
          <span className="relative">
            logout
            <span className={underlineclassName} />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
