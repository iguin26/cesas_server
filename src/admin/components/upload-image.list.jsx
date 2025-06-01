import React, { useState } from "react";
import { Box } from "@adminjs/design-system";

const Edit = (props) => {
  const { record } = props;
  const srcImg = record.params["image"];
  const [showFullSize, setShowFullSize] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowFullSize(!showFullSize);
  };

  return (
    <Box>
      {srcImg ? (
        <>
          <img
            src={srcImg}
            width={showFullSize ? "400px" : "100px"}
            style={{ cursor: "pointer", transition: "0.3s" }}
            onClick={handleClick}
            alt="preview"
          />
        </>
      ) : (
        "no image"
      )}
    </Box>
  );
};

export default Edit;
