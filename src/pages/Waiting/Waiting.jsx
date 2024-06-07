import React from "react";
import { Spinner } from "../../components";

export default function Waiting() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner />
    </div>
  );
}
