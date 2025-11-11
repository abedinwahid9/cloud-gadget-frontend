"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CustomBreadCrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path);

  let currentPath = "";
  const crumbLink = paths.map((p) => {
    currentPath += `/${p}`;
    return { name: p, path: currentPath };
  });

  const shouldCollapse = crumbLink.length > 3;

  return (
    <Breadcrumb className="mt-4 mx-5 ">
      <BreadcrumbList>
        {/* Always show Home */}
        <BreadcrumbItem className="text-lg font-semibold text-primary dark:text-secondary  ">
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {crumbLink.length > 0 && <BreadcrumbSeparator />}

        {shouldCollapse ? (
          <>
            {/* Dropdown with middle items */}
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="size-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="bg-primary/85 border-0"
                >
                  {crumbLink.slice(0, -1).map((item, i) => (
                    <DropdownMenuItem
                      className="text-lg font-semibold text-secondary dark:text-secondary   capitalize"
                      key={i}
                      asChild
                    >
                      <Link className="hover:text-nav" href={item.path}>
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {/* Last item (current page) */}
            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg  font-semibold text-primary dark:text-secondary   capitalize underline">
                {crumbLink[crumbLink.length - 1].name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          /* Normal breadcrumb when <= 3 */
          crumbLink.map((path, i) => (
            <div
              className="text-lg flex items-center font-semibold text-primary dark:text-secondary  "
              key={i}
            >
              <BreadcrumbItem>
                {i === crumbLink.length - 1 ? (
                  <BreadcrumbPage className="text-lg font-semibold text-primary dark:text-secondary  capitalize underline">
                    {path.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={path.path}>{path.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {i !== crumbLink.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadCrumb;
