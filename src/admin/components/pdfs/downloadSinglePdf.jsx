import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DownloadSinglePdf = (props) => {
  const { redirectUrl } = props.record.params;
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectUrl) {
      window.open(redirectUrl, "_blank");
      navigate(-1);
    }
  }, [redirectUrl, navigate]);

  return null;
};

export default DownloadSinglePdf;
