import Link from "next/link";

const NavLink = ({
  children,
  href,
  underline = false,
  className
}: {
  children: React.ReactNode;
  href: string;
  underline?: boolean;
  className?: string;
}) => {
  const colorHoverClasses =
    "dark:hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700 md:hover:bg-transparent md:dark:hover:bg-transparent md:hover:text-blue-600 md:dark:hover:text-blue-500";
  const underlineHoverClasses = "dark:hover:underline hover:underline";
  return (
    <Link href={href}>
      <a
        className={`${
          !className && (underline ? underlineHoverClasses : colorHoverClasses)
        } ${className} block border-x border-gray-100 py-2 pr-4 pl-3 text-gray-700 dark:border-gray-700 dark:text-gray-400 md:border-0 md:p-0`}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
