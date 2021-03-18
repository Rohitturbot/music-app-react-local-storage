import React from "react";
import Icon from "../Icon";
import { infoIcon } from "../../constants/icon";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const InfoTooltip = ({
  content,
  placement = "top",
  children,
  className = "",
}) => {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<Tooltip id="button-tooltip">{content}</Tooltip>}
    >
      <span className={className}>
        {!!children ? (
          children
        ) : (
          <Icon icon={infoIcon} fixedWidth={true} className="text-muted" />
        )}
      </span>
    </OverlayTrigger>
  );
};

export default InfoTooltip;
