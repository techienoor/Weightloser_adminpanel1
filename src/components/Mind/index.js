import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Button from "components/Button";
import Typography from "components/Typography";
import Card from "components/Card";
import styles from "./Minds.module.scss";
import { SearchInput } from "components/Header";
import api, { getImage } from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import Upload from "./Upload";
import Input from "components/Input";
import ListPlaceholder from "components/ListPlaceholder";
import { fetchMind, fetchCBT } from "redux/reducers/mind.reducer";
import CBTForm from "./CBTForm";
import Modal from "components/Modal";
import MeditationFOrm from "./MeditationForm";
import GridFiller from "components/GridFiller";
import CBTListing from "./CBTListing";
import EditMeditationForm from "./MeditationForm/EditForm";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const EXERCISE_CARD_IMAGE_THUMBNAIL =
  "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const MindCard = ({ mind = {}, ...rest }) => {
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
    <div {...rest} className={styles.mind_card__base}>
      <div className={styles.img_top}>
        <img
          src={getImage(mind.FileName)}
          onError={(el) => {
            el.target.src = EXERCISE_CARD_IMAGE_THUMBNAIL;
          }}
        />
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

const MindsListing = ({ title, data = [], onEdit }) => {
  return (
    <>
      <Typography className="mt-3" block variant="body_bold">
        {title}
      </Typography>
      <section className={styles.minds_listing_container}>
        {data && data.length ? (
          <>
            {data.map((m) => (
              <MindCard key={m.Id} mind={m} onClick={() => onEdit(m)} />
            ))}
            <GridFiller />
          </>
        ) : (
          <ListPlaceholder text="No data added" />
        )}
      </section>
    </>
  );
};

const TABS = {
  CBT: "CBT",
  MEDITATION: "MEDITATION",
};

const Minds = () => {
  const allData = useSelector((state) => state.mind.data);
  const allCBTs = useSelector((state) => state.mind.cbt);
  const [cbts, setCbts] = useState([]);
  const [data, setData] = useState([]);
  const [isCBTFormOpen, setIsCBTFormOpen] = useState(false);
  const [isMeditationFormOpen, setIsMeditationFormOpen] = useState(false);
  const [isEditMeditationFormOpen, setIsEditMeditationFormOpen] =
    useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [currentTab, setCurrentTab] = useState(TABS.CBT);
  const [selectedMeditationId, setSelectedMeditationId] = useState(null);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const [duration, setDuration] = useState({
    DateFrom: "",
    DateTo: "",
  });

  useEffect(() => {
    dispatch(fetchMind());
    dispatch(fetchCBT());
  }, []);
  useEffect(() => {
    if (searchRef && searchRef.current) {
      filterData(searchRef.current.value);
    } else {
      setData(allData);
    }
  }, [allData]);
  useEffect(() => {
    if (searchRef && searchRef.current) {
      filterCbts(searchRef.current.value);
    } else {
      setCbts(allCBTs);
    }
  }, [allCBTs]);

  const filterData = (search) => {
    const filteredData = allData.filter(
      (f) => f.Title?.toLowerCase().trim().indexOf(search.toLowerCase()) > -1
    );
    setData(filteredData);
  };
  const filterCbts = (search) => {
    const filteredData = allCBTs.filter(
      (f) => f.Title?.toLowerCase().trim().indexOf(search.toLowerCase()) > -1
    );
    setCbts(filteredData);
  };

  const handleSearchMinds = (e) => {
    filterData(e.target.value);
    filterCbts(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleSearchMinds, 500);
  }, [allData]);
  const handleMeditationFormClose = () => {
    setIsMeditationFormOpen(false);
    dispatch(fetchMind());
  };
  const hanldeSaveCBT = () => {
    setIsCBTFormOpen(false);
    dispatch(fetchCBT());
  };
  const handleCloseEditMeditationForm = () => {
    setIsEditMeditationFormOpen(false);
    dispatch(fetchMind());
  };
  const handleEditMeditation = (m) => {
    setSelectedMeditation(m);
    setIsEditMeditationFormOpen(true);
  };

  const handleClickUpload = () => {
    if (!duration.DateFrom || !duration.DateTo) {
      toast("Please select both start and end dates", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return false;
    }
    setIsCBTFormOpen(true);
  };

  return (
    <>
      <Typography className="mb-2" block>
        Mind
      </Typography>
      <div className={styles.top}>
        <Card className={styles.actions}>
          {currentTab === TABS.CBT ? (
            <>
              <Button
                onClick={() => setIsCBTFormOpen(true)}
                className="text-center"
                block
              >
                <Typography>Upload CBT</Typography>
              </Button>
              {/* <Button outlined block className="text-center">
                <Typography>Edit CBT</Typography>
              </Button> */}
            </>
          ) : (
            <>
              <Button
                onClick={() => setIsMeditationFormOpen(true)}
                className="text-center"
                block
              >
                <Typography>New Meditation</Typography>
              </Button>
              {/* <Button outlined block className="text-center">
                <Typography>Edit Meditation</Typography>
              </Button> */}
            </>
          )}
        </Card>
        <Card className={styles.content}>
          <div className={styles.featured}>
            <Typography variant="body_bold" block>
              Featured Video
            </Typography>
            <Upload className="mb-1" onClick={handleClickUpload} />
            <Typography variant="small" block>
              Duration
            </Typography>
            <div className={styles.durations}>
              <Input
                type="date"
                variant="outlined-rounded"
                value={duration.DateFrom}
                onChange={(e) =>
                  setDuration((prev) => ({ ...prev, DateFrom: e.target.value }))
                }
              />
              <Typography variant="small">To</Typography>
              <Input
                type="date"
                variant="outlined-rounded"
                value={duration.DateTo}
                onChange={(e) =>
                  setDuration((prev) => ({ ...prev, DateTo: e.target.value }))
                }
              />
            </div>
          </div>
          {/* <div className={styles.link}>
            <Typography className="mb-1" block>
              Link
            </Typography>
            <div>
              https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley
            </div>
          </div>
          <div className={styles.labels}>
            <Label title="Total Views" count={103} />
            <Label title="Lorem Ipsum" count={99} />
          </div> */}
        </Card>
      </div>

      <Card>
        <div className={styles.tabs}>
          <Button
            onClick={() => setCurrentTab(TABS.CBT)}
            outlined={currentTab !== TABS.CBT}
          >
            <Typography>CBT</Typography>
          </Button>
          <Button
            onClick={() => setCurrentTab(TABS.MEDITATION)}
            outlined={currentTab !== TABS.MEDITATION}
          >
            <Typography>Meditation</Typography>
          </Button>
          <SearchInput inputRef={searchRef} onChange={debouncedResults} />{" "}
          {/* <Typography variant="body_bold" className="ml-3">
            Sort By
          </Typography> */}
          <Link to="/mind/stats">
            <Button
              size="sm"
              outlined
              className={styles.btn_stats}
              variant="secondary"
            >
              <Typography variant="small">Stats for Mind</Typography>
            </Button>
          </Link>
        </div>
        {/* <MindsListing title="Top Minds" /> */}
        {currentTab === TABS.CBT ? (
          <CBTListing title="All CBT" data={cbts} />
        ) : (
          <MindsListing
            title="All Minds"
            data={data}
            onEdit={handleEditMeditation}
          />
        )}
      </Card>
      <Modal
        isOpen={isCBTFormOpen}
        onClose={() => setIsCBTFormOpen(false)}
        size="sm"
      >
        <CBTForm dates={duration} onSave={hanldeSaveCBT} />
      </Modal>
      <Modal isOpen={isMeditationFormOpen} onClose={handleMeditationFormClose}>
        <MeditationFOrm meditationId={selectedMeditationId} />
      </Modal>

      <Modal
        isOpen={isEditMeditationFormOpen}
        onClose={handleCloseEditMeditationForm}
      >
        <EditMeditationForm meditation={selectedMeditation} />
      </Modal>
    </>
  );
};

export default Minds;
