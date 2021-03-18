import React from "react";
import Icon from "../Icon";
import { loadingIconLight } from "../../constants/icon";

const LoadingIcon = ({ className, fixedWidth = true }) => (
  <Icon
    icon={loadingIconLight}
    fixedWidth={fixedWidth}
    spin
    className={className}
  />
);

export default LoadingIcon;
