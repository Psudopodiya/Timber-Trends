import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./dropdown-menu";
import { Button } from "./button";
import { UserCircleIcon } from "./icons/icons";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800",
      className
    )}
    {...props}
  />
));

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const CustomAvatar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="icon" className="rounded-full text-white">
          {isLoggedIn ? (
            <Avatar>
              <AvatarImage
                src="/placeholder.svg"
                alt="User avatar"
                className="text-white"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          ) : (
            <UserCircleIcon className="h-7 w-7 text-white" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => console.log("Wallet clicked")}>
          Wallet
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log("Dashboard clicked")}>
          Dashboard
        </DropdownMenuItem>
        {isLoggedIn ? (
          <DropdownMenuItem onSelect={() => setIsLoggedIn(false)}>
            Logout
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onSelect={() => setIsLoggedIn(true)}>
            Login
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export { Avatar, AvatarImage, AvatarFallback, CustomAvatar };
