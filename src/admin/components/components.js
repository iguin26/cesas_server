import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  Edit: componentLoader.add("Edit", "./upload-image.edit.jsx"),
  List: componentLoader.add("List", "./upload-image.list.jsx"),
  DownloadSinglePdf: componentLoader.add(
    "DownloadSinglePdf",
    "./pdfs/downloadSinglePdf.jsx"
  ),
  DownloadAllPdfs: componentLoader.add(
    "DownloadAllPdfs",
    "./pdfs/downloadAllPdfs.jsx"
  ),
  DownloadSelectedPdfs: componentLoader.add(
    "DownloadSelectedPdfs",
    "./pdfs/downloadSelectedPdfs.jsx"
  ),
  HomePage: componentLoader.add("HomePage", "./homePage.jsx"),
  DownloadSingleCsv: componentLoader.add(
    "DownloadSingleCsv",
    "./csvs/downloadSingleCsv.jsx"
  ),
  DownloadSelectedCsvs: componentLoader.add(
    "DownloadSelectedCsvs",
    "./csvs/downloadSelectedCsvs.jsx"
  ),
  DownloadAllCsvs: componentLoader.add(
    "DownloadAllCsvs",
    "./csvs/downloadAllCsvs.jsx"
  ),
};

export { componentLoader, Components };
