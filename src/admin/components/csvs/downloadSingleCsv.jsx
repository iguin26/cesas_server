import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNotice } from "adminjs";

const DownloadSingleCsv = (props) => {
  const navigate = useNavigate();
  const addNotice = useNotice();
  const started = useRef(false);

  const recordId = props.record.params.id;
  const downloadUrl = `/admin/csv/profis-student/${recordId}`;

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const download = async () => {
      try {
        const res = await fetch(downloadUrl, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erro ao gerar CSV");
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        // O nome do arquivo será definido pelo Content-Disposition do servidor
        a.download = "";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        addNotice({
          message: "Download do CSV do aluno PROFIS iniciado!",
          type: "success",
        });
        navigate(-1);
      } catch (err) {
        addNotice({
          message: "Erro ao baixar CSV",
          type: "error",
        });
        navigate(-1);
      }
    };
    download();
  }, [addNotice, navigate, downloadUrl, recordId]);

  return null;
};

export default DownloadSingleCsv;
