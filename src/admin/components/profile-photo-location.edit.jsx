import React from "react";
import { Label, Box, DropZone } from "@adminjs/design-system";

const Edit = (props) => {
  const { property, onChange } = props;

  const handleDropZoneChange = (files) => {
    onChange("image", files[0]?.name);
  };

  return (
    <Box>
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange} />
    </Box>
  );
};
export default Edit;
