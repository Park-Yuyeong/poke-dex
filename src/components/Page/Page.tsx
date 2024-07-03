import { cva } from "class-variance-authority";
import { PropsWithChildren } from "react";

interface PageProps {
  title?: string;
  width?: "md" | "lg";
}

const pageVariant = cva(
  "h-screen mx-auto flex flex-col items-center px-2 py-10",
  {
    variants: {
      width: {
        md: "max-w-[768px]",
        lg: "max-w-[1024px]",
      },
    },
    defaultVariants: {
      width: "lg",
    },
  }
);

const Page = ({
  title = "",
  width,
  children,
}: PropsWithChildren<PageProps>) => {
  return (
    <main className={pageVariant({ width })}>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {children}
    </main>
  );
};

export default Page;
