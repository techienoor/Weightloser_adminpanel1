import { useEffect, useState } from "react";
import styles from "./ArticleCard.module.scss";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";

const ArticleCard = ({ data = {} }) => {
  const { Id, Title, Description, FileName, CreatedAt } = data;
  const [reads, setReads] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data: res } = await api.get(API_URLS.blog.counts(Id));
        setReads(res.count);
      } catch (ex) {
        console.error(ex.message);
      }
    })();
  }, []);

  return (
    <div className={styles.base}>
      <div className={styles.image}>
        <img
          src={`${process.env.REACT_APP_IMAGES_URL}${FileName}`}
          onError={(el) => {
            el.target.src = CARD_PLACEHOLDER_IMAGE;
          }}
        />
      </div>
      <div className={styles.content}>
        <h4>{Title}</h4>
        <div className={styles.reads}>
          <span>Read</span>
          <span>{reads}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
