import path from "path";
import fs from "fs";
import { ValidationError } from "adminjs";

export const uploadBeforeHook = async (request, context) => {
  if (request.method === "get") {
    return {
      ...request,
    };
  }

  if (request.method === "post") {
    const { uploadImage, ...otherParams } = request.payload;
    context.uploadImage = uploadImage;

    if (uploadImage && uploadImage.name && uploadImage.path) {
      return {
        ...request,
        payload: otherParams,
      };
    }
    const errors = {};
    errors.uploadImage = {
      message: "Arquivo inválido ou maior que 5MB",
    };
    throw new ValidationError(errors);
  }
  return request;
};

export const uploadAfterHook = async (response, request, context) => {
  const { record, uploadImage, resource } = context;

  const entity = resource._decorated?.id() || resource.id();

  if (record.isValid() && uploadImage) {
    const filePath = path.join(
      `uploads/${entity}`,
      record.id().toString(),
      uploadImage.name
    );
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    await fs.promises.rename(uploadImage.path, filePath);

    await record.update({ image: `/${filePath}` });
  }
  return response;
};
