import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNotice } from "adminjs";

const DownloadAllCsvs = () => {
  const navigate = useNavigate();
  const addNotice = useNotice();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const download = async () => {
      try {
        const res = await fetch("/admin/csv/profis-all", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erro ao gerar ZIP de CSVs");
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "csvs_todos_alunos_profis.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        addNotice({
          message: "Download dos CSVs de todos os alunos PROFIS iniciado!",
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
  }, [addNotice, navigate]);

  return null;
};

export default DownloadAllCsvs;
