import React, { useState } from "react";
import { Label, Box, DropZone, DropZoneItem } from "@adminjs/design-system";

const Edit = (props) => {
  const { property, onChange, record } = props;
  const [dropZoneKey, setDropZoneKey] = useState(0);

  const backendError = record.errors?.uploadImage?.message;

  const uploadedPhoto = record.params.image;
  const photoToUpload = record.params[property.name];

  const handleRemove = () => {
    onChange(property.name, null);
    setDropZoneKey((k) => k + 1);
  };

  return (
    <Box marginBottom="xxl">
      <Label>{"Imagem"}</Label>
      {!photoToUpload && (
        <DropZone
          key={dropZoneKey}
          onChange={(files) => onChange(property.name, files[0])}
        />
      )}

      {photoToUpload && (
        <Box mt="lg">
          <DropZoneItem
            src={URL.createObjectURL(photoToUpload)}
            filename={photoToUpload.name}
            onRemove={handleRemove}
          />
        </Box>
      )}

      {!photoToUpload && uploadedPhoto && (
        <Box mt="lg">
          <DropZoneItem src={uploadedPhoto} onRemove={handleRemove} />
        </Box>
      )}
      {backendError && (
        <Box color="red" mt="sm">
          {backendError}
        </Box>
      )}
    </Box>
  );
};

export default Edit;
