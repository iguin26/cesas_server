import path from "path";
import fs from "fs";

export const uploadBeforeHook = async (request, context) => {
  if (request.method === "get") {
    return {
      ...request,
    };
  }
  if (request.method === "post") {
    const { uploadImage, ...otherParams } = request.payload;
    context.uploadImage = uploadImage;

    return {
      ...request,
      payload: otherParams,
    };
  }
};

export const uploadAfterHook = async (response, request, context) => {
  const { record, uploadImage } = context;
  if (record.isValid() && uploadImage) {
    const filePath = path.join(
      "uploads/course",
      record.id().toString(),
      uploadImage.name
    );
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    await fs.promises.rename(uploadImage.path, filePath);

    await record.update({ profilePhotoLocation: `/${filePath}` });
  }
  return response;
};
