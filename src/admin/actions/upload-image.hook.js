import path from "path";
import fs from "fs";
import { ValidationError } from "adminjs";

export const uploadBeforeHook = async (request, context) => {
  if (request.method === "get") return request;

  if (request.method === "post") {
    const { uploadImage, ...otherParams } = request.payload;
    context.uploadImage = uploadImage;

    // se tiver criando um novo, obviamente a img é obrigatoria pq nn pode ficar sem img
    if (!request.payload.id && !uploadImage) {
      throw new ValidationError({
        uploadImage: { message: "Imagem obrigatória." },
      });
    }

    // valida tamanho da img e se é img mermo
    if (uploadImage) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024;
      if (!allowedTypes.includes(uploadImage.type)) {
        throw new ValidationError({
          uploadImage: { message: "Formato inválido. Só PNG, JPG ou JPEG." },
        });
      }
      if (uploadImage.size > maxSize) {
        throw new ValidationError({
          uploadImage: { message: "Imagem maior que 5MB." },
        });
      }
    }

    // nn salva no banco nn
    return {
      ...request,
      payload: otherParams,
    };
  }

  return request;
};

export const uploadAfterHook = async (response, request, context) => {
  const { record, uploadImage, resource } = context;
  const entity = resource._decorated?.id() || resource.id();

  if (record.isValid() && uploadImage) {
    // se existir alguma img antiga (ou seja se nn for novo e estiver sendo editado teoricamente kkkk)
    const oldImagePath = record.param("image");
    if (oldImagePath) {
      const absoluteOldPath = path.join(process.cwd(), oldImagePath);
      try {
        await fs.promises.unlink(absoluteOldPath);
      } catch (e) {}
    }

    // salva a img
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
