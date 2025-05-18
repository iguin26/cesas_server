import React from "react";
import { Box } from "@adminjs/design-system";

const Edit = (props) => {
  const { record } = props;

  const srcImg = record.params["profilePhotoLocation"];

  return <Box>{srcImg ? <img src={srcImg} width="100px" /> : "no image"}</Box>;
};
export default Edit;
