import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  buttonText?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  buttonText,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          {description}
        </p>
      </div>

      {buttonText}
    </div>
  );
}
