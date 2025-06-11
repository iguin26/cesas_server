import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNotice } from "adminjs";

const DownloadAllPdfs = () => {
  const navigate = useNavigate();
  const addNotice = useNotice();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const download = async () => {
      try {
        const res = await fetch("/admin/pdf/all", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erro ao gerar ZIP");
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "fichas_alunos.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        addNotice({
          message: "Download dos PDFs de todos os alunos iniciado!",
          type: "success",
        });
        navigate(-1);
      } catch (err) {
        addNotice({
          message: "Erro ao baixar zip",
          type: "error",
        });
        navigate(-1);
      }
    };
    download();
  }, [addNotice, navigate]);

  return null;
};

export default DownloadAllPdfs;
