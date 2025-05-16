import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  Edit: componentLoader.add("Edit", "./profile-photo-location.edit.jsx"),
};

export { componentLoader, Components };
