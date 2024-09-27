import React, { ReactNode } from "react";

type IconNames = "search" | "filter";

type IconWrapperType = {
  children: ReactNode;
  fill?: string;
  stroke?: string | "none";
  strokeWidth?: number;
  className?: string;
};

const IconWrapper = ({
  children,
  fill = "currentColor",
  stroke = "none",
  strokeWidth = 1.5,
  className,
}: IconWrapperType) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={stroke !== "none" ? strokeWidth : 0}
      >
        {children}
      </svg>
    </div>
  );
};

const Icon = ({
  name,
  className = "w-4 h-4",
}: {
  name: IconNames;
  className?: string;
}) => {
  if (name === "search") {
    return (
      <IconWrapper stroke="currentColor" fill="none" className={className}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </IconWrapper>
    );
  }

  if (name === "filter") {
    return (
      <IconWrapper stroke="currentColor" fill="none" className={className}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
        />
      </IconWrapper>
    );
  }
};

export default Icon;
