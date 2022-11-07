import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Loading = () => {
  return (
    <div className="flex justify-center">
      <Box sx={{ width: "50%" }} className="">
        <h4 className="text-center">Loading...</h4>
        <LinearProgress />
      </Box>
    </div>
  );
};

export default Loading;
