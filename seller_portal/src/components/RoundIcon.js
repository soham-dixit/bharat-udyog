import React from "react";
import classNames from "classnames";

function RoundIcon({
  icon: Icon,
  iconColorClass = "text-color dark:text-purple-100",
  bgColorClass = "bg-color dark:bg-purple-600",
  className,
}) {
  const baseStyle = "p-3 rounded-full";

  const cls = classNames(baseStyle, iconColorClass, bgColorClass, className);
  return (
    <div className={cls}>
      <Icon className="w-5 h-5" />
    </div>
  );
}

export default RoundIcon;
