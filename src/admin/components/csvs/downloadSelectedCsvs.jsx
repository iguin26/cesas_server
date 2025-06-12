import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNotice } from "adminjs";

const DownloadSelectedCsvs = (props) => {
  const navigate = useNavigate();
  const addNotice = useNotice();
  const started = useRef(false);

  var recordIds = [];
  for (const record of props.records) {
    const id = record.id;
    recordIds.push(id);
  }
  const downloadUrl = `/admin/csv/profis-selected?ids=${recordIds.join(",")}`;
  const filename = "csvs_alunos_profis_selecionados.zip";

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const download = async () => {
      try {
        const res = await fetch(downloadUrl, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erro ao gerar ZIP de CSVs");
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        addNotice({
          message: "Download dos CSVs dos alunos PROFIS selecionados iniciado!",
          type: "success",
        });
        navigate(-1);
      } catch (err) {
        addNotice({
          message: "Erro ao baixar ZIP de CSVs",
          type: "error",
        });
        navigate(-1);
      }
    };
    download();
  }, [addNotice, navigate, downloadUrl, filename]);

  return null;
};

export default DownloadSelectedCsvs;
