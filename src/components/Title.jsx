import React from "react";
import { Helmet } from "react-helmet";

export default function Title({ children }) {
  return (
    <Helmet>
      <title>PooyaSamimi | {children || ""}</title>
    </Helmet>
  );
}
