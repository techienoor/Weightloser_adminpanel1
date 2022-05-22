import { useState, useEffect, useCallback } from "react";
import Typography from "components/Typography";
import styles from "./CBTCard.module.scss";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";

const VIDEO_BASE_URL = "https://weightchoper.somee.com/staticfiles/videos/";

export const getVideoUrl = (videoUrl) => {
  if (videoUrl) {
    if (videoUrl.indexOf("mindyogavideos.s3.amazonaws.com") > -1) {
      return videoUrl;
    }
    return VIDEO_BASE_URL + videoUrl;
  }
  return null;
};

const CBTCard = ({ mind = {} }) => {
  const [counts, setCounts] = useState(0);

  const getCounts = useCallback(async () => {
    const { data } = await api.get(API_URLS.diet.getCounts(mind.Id));
    if (data) {
      setCounts(data.count);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!mind.Id) {
        return false;
      }
      await getCounts();
    })();
  });

  if (!mind.Id) {
    return <div></div>;
  }

  return (
    <div className={styles.mind_card__base}>
      <div className={styles.img_top}>
        <video src={getVideoUrl(mind.VideoFile)} />
      </div>
      <div className={styles.content}>
        <div className={styles.head}>
          <Typography variant="small" className={styles.title}>
            {mind.Title || "N/A"}
          </Typography>
          <Typography variant="extra_small" className={styles.duration}>
            {mind.duration} {mind.duration > 1 ? "days" : "day"}
          </Typography>
        </div>
        <Typography variant="extra_small" className={styles.follow_label}>
          People following
        </Typography>
        <Typography variant="extra_small" className={styles.follow_counts}>
          {counts}
        </Typography>
      </div>
    </div>
  );
};

export default CBTCard;
