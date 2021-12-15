import React from "react";
import LottieAnimation from "../lottie/lottieAnimation";
import spinner from "../../animation/spinner.json";

export const Spinner = ({ width = 200, height = 200 }) => (
  <div>
    <LottieAnimation lottie={spinner} width={width} height={height} />
  </div>
);
