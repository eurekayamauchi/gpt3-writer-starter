import React from "react";
import { useState } from 'react';
import ReactLoading from "react-loading";

const Loading = ({ children }) => {
  

  const [isGenerating] = useState(false)
  console.log(isGenerating)

  if (isGenerating) {
    return (
      <section className="flex justify-center items-center h-screen">
        <div>
          <ReactLoading
            type="spin"
            color="#ebc634"
            height="100px"
            width="100px"
            className="mx-auto"
          />
          <p className="text-center mt-3">loading</p>
        </div>
      </section>
    );
  } else {
    return <>{children}</>;
  }
};

export default Loading;