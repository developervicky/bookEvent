"use client";
import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <section className="h-full flex justify-center items-center py-5 md:py-10">
      <div className="wrapper mx-10 bg-grey-50 rounded-2xl flex flex-col gap-4 flex-center">
        <h3 className="h3-bold text-center">
          Your Page is loading, spare some seconds!
        </h3>
        <InfinitySpin width="200" color="#6D4C3D" />
      </div>
    </section>
  );
};

export default Loading;
