import React from "react";
import { Label, Box, DropZone, DropZoneItem } from "@adminjs/design-system";

const Edit = (props) => {
  const { property, onChange, record } = props;

  const handleDropZoneChange = (files) => {
    onChange(property.name, files[0]);
  };

  const uploadedPhoto = record.params.profilePhotoLocation;
  const photoToUpload = record.params[property.name];

  console.log(record);
  return (
    <Box marginBottom="xxl">
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange} />
      {uploadedPhoto && !photoToUpload && (
        <div>
          <DropZoneItem src={uploadedPhoto} />{" "}
          {record.params.profilePhotoLocation}/
        </div>
      )}
    </Box>
  );
};
export default Edit;
