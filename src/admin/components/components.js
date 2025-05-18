import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  Edit: componentLoader.add("Edit", "./upload-image.edit.jsx"),
  List: componentLoader.add("List", "./upload-image.list.jsx"),
};

export { componentLoader, Components };
