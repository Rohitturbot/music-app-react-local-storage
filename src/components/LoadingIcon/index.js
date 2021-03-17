import React from "react";
import { loadingIconLight } from "../../constants/icon";
import Icon from "../Icon";

const LoadingIcon = ({ className, fixedWidth = true }) => (
  <Icon
    icon={loadingIconLight}
    fixedWidth={fixedWidth}
    spin
    className={className}
  />
);

export default LoadingIcon;
