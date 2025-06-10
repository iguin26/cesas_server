import React from "react";
import { useState } from "react";
import { Label, Box, DropZone, DropZoneItem } from "@adminjs/design-system";

const Edit = (props) => {
  const { property, onChange, record } = props;

  const [error, setError] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/svg+xml"];
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  const handleDropZoneChange = (files) => {
    const file = files[0];

    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Arquivo inválido: apenas JPEG e PNG são permitidos.");
        setPreviewFile(null);
        onChange(property.name, null);
        return;
      }

      if (file.size > MAX_SIZE) {
        setError("Arquivo muito grande. Máximo permitido: 5MB.");
        setPreviewFile(null);
        onChange(property.name, null);
        return;
      }
      setError(null); // limpar erro
      setPreviewFile(file);
      onChange(property.name, file);
    }
  };

  const uploadedPhoto = record.params.image;
  const photoToUpload = record.params[property.name];

  return (
    <Box marginBottom="xxl">
      <Label>{"Imagem"}</Label>
      <DropZone onChange={handleDropZoneChange} />
      {error && (
        <Box color="red" mt="sm">
          {error}
        </Box>
      )}
      {!photoToUpload && uploadedPhoto && !error && (
        <Box mt="lg">
          <DropZoneItem src={uploadedPhoto} />
        </Box>
      )}
    </Box>
  );
};

export default Edit;
