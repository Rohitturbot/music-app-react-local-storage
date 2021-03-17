import React from "react";
import LoadingIndicatorRow from "../LoadingIndicatorRow";

export default {
  component: LoadingIndicatorRow,
  title: "List/Loading Indicator Row",
};

export const DefaultRow = () => <LoadingIndicatorRow />;
export const KitchenSink = () => <LoadingIndicatorRow className={"py-3"} />;
