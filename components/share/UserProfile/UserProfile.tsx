import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUserAlt } from "react-icons/fa";

const UserProfile = () => {
  const userIcons: string = "w-6 h-6 text-nav";
  const menuItemClass =
    "group relative text-md font-semibold transition-colors duration-300 hover:text-secondary";
  const underlineClass =
    "absolute left-0 -bottom-1 h-[2px] w-0 bg-secondary transition-all duration-300 group-hover:w-full";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
        <FaUserAlt className={userIcons} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end" // aligns to the left of trigger
        alignOffset={-5} // offset from the trigger (downward)
        className="bg-primary border-none text-secondary "
      >
        <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={menuItemClass}>
          <span className="relative">
            Profile
            <span className={underlineClass} />
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem className={menuItemClass}>
          <span className="relative">
            Billing
            <span className={underlineClass} />
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem className={menuItemClass}>
          <span className="relative">
            Team
            <span className={underlineClass} />
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem className={menuItemClass}>
          <span className="relative">
            Subscription
            <span className={underlineClass} />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
