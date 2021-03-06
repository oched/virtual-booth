/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import axios from "axios";
import HotspotImg from "components/hotspotImg";
import Popup from "components/Popup/popup";
import Head from "next/head";
import { useRouter } from "next/router";
import { Accordion, Button } from "react-bootstrap";
import { protectMainHall } from "../services/withAuth";
import { jsPDF, HTMLOptionImage } from "jspdf";
import Cookie from "js-cookie";

import PopupWinners from "components/PopupWinners";
import PopupRecords from "components/PopupRecords";
import PopupQnA from "components/PopupQnA";
import PopupLogout from "components/PopupLogout";
import PopupMsg from "components/PopupMsg";

import PopupSertif from "components/PopupSertif";


export const getServerSideProps = async (context) => protectMainHall(context);
export default function MainHall(props) {
  const router = useRouter();
  const from = router.query.fromB;
  const recordps = props.datavideo1;
  const recordps2 = props.datavideo2;
  const jenisPeserta = props.jenis_peserta;
  const [showSertif, setShowSertif] = useState(false);
  const [showRecord, setShowRecord] = useState(false);
  const [showQnA, setShowQnA] = useState(false);
  const [showWinners, setShowWinners] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [zoomStatus, setZoomStatus] = useState(false);
  const [Urlzoom, setUrlzoom] = useState("");
  // const [noser, setNoser] = useState("");
  // const [jpeserta, setJpeserta] = useState(props.jenis_peserta);

  const popupCloseHandler = () => {
    setShowSertif(false);
    setShowRecord(false);
    setShowQnA(false);
    setShowWinners(false);
    setShowLogout(false);
    setErrorMsg("");
  };

  const logout = () => {
    localStorage.clear();
    Cookie.remove("token");
    router.reload();
  };

  const clickBooth = (e, nama, sponsorId) => {
    e.preventDefault();
    axios
      .get(process.env.BASE_URL + "/get-by-sponsorid/" + sponsorId, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then((res) => {
        if (res.data.status == "success") {
          localStorage.setItem("sponsor", nama);
          localStorage.setItem("sponsorId", sponsorId);
          localStorage.setItem("files", JSON.stringify(res.data.data));
          router.push("/booth_" + nama);
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toWebinar = (e) => {
    e.preventDefault();
    axios
      .get(process.env.BASE_URL + "/zoom/join-zoom", {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then((res) => {
        if (res.data.status == "success") {
          setZoomStatus(true);
          setUrlzoom(res.data.data.Zoom_joinurl);
          setErrorMsg(res.data.message);
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let video;
  if (from === "bioderma") {
    video = (
      <video
        className="latar"
        id="sikuen"
        autoPlay
        playsInline
        muted
        onEnded={() => window.showHotspots()}
      >
        <source
          src={`${props.base}/boothx/bioderma_out.mp4`}
          type="video/mp4"
        />
        Your browser does not support to access Virtual Booth
      </video>
    );
  } else if (from === "laroche") {
    video = (
      <video
        className="latar"
        id="sikuen"
        autoPlay
        playsInline
        muted
        onEnded={() => window.showHotspots()}
      >
        <source src={`${props.base}/boothx/laroche_out.mp4`} type="video/mp4" />
        Your browser does not support to access Virtual Booth
      </video>
    );
  } else if (from === "dermaxp") {
    video = (
      <video
        className="latar"
        id="sikuen"
        autoPlay
        playsInline
        muted
        onEnded={() => window.showHotspots()}
      >
        <source src={`${props.base}/boothx/dermaxp_out.mp4`} type="video/mp4" />
        Your browser does not support to access Virtual Booth
      </video>
    );
  } else if (from === "galderma") {
    video = (
      <video
        className="latar"
        id="sikuen"
        autoPlay
        playsInline
        muted
        onEnded={() => window.showHotspots()}
      >
        <source
          src={`${props.base}/boothx/galderma_out.mp4`}
          type="video/mp4"
        />
        Your browser does not support to access Virtual Booth
      </video>
    );
  } else if (from === "hyphens") {
    video = (
      <video
        className="latar"
        id="sikuen"
        autoPlay
        playsInline
        muted
        onEnded={() => window.showHotspots()}
      >
        <source src={`${props.base}/boothx/hyphens_out.mp4`} type="video/mp4" />
        Your browser does not support to access Virtual Booth
      </video>
    );
  } else if (from === "sdm") {
    video = (
      <video
        className="latar"
        id="sikuen"
        autoPlay
        playsInline
        muted
        onEnded={() => window.showHotspots()}
      >
        <source src={`${props.base}/boothx/sdm_out.mp4`} type="video/mp4" />
        Your browser does not support to access Virtual Booth
      </video>
    );
  } else if (from === "booth") {
    video = (
      <video
        className="latar"
        id="sikuen"
        autoPlay
        playsInline
        muted
        onEnded={() => window.showHotspots()}
      >
        <source
          src={`${props.base}/boothx/booth_silver_out.mp4`}
          type="video/mp4"
        />
        Your browser does not support to access Virtual Booth
      </video>
    );
  } else {
    video = (
      <video
        className="latar"
        id="sikuen"
        autoPlay
        playsInline
        muted
        onEnded={() => window.showHotspots()}
      >
        <source src={`${props.base}/boothx/hall.mp4`} type="video/mp4" />
        Your browser does not support to access Virtual Booth
      </video>
    );
  }

  // async function generatePdf(j, d) {
  //   const doc = new jsPDF("l");
  //   var width = doc.internal.pageSize.getWidth();
  //   var height = doc.internal.pageSize.getHeight();
  //   doc.setFontSize(40);
  //   doc.addImage(d, "JPEG", 0, 0, width, height);
  //   doc.setFont("Time-Roman", "italic");
  //   doc.setFontSize(30);
  //   doc.setTextColor("#474745");
  //   doc.text(props.name, 153, 90, "center");

  //   doc.output(
  //     "save",
  //     "Sertifikat_" + j + "_FKUWKS_PKBKULIT_" + props.name + "_2022.pdf"
  //   );
  // }

  return (
    <>
      <Head>
        <title>Main Hall - Virtual Booth</title>
        <meta name="description" content="PKBKULIT - FKUWKS" />
      </Head>

      {video}

      <div id="sikuen2" className="hide">
        <video id="latar" className="latar" autoPlay playsInline muted loop>
          <source src={`${props.base}/boothx/hall_loop.mp4`} type="video/mp4" />
          Your browser does not support to access Virtual Booth
        </video>
        <div id="hotspots">
          <HotspotImg
            onClick={(e) => clickBooth(e, "bernofarm", "SP-2")}
            imgSrc="https://cdn.fkuwks.com/images/sponsors/logo-bernofarm.png"
            top="9%"
            right="28%"
            small
          />
          <HotspotImg
            onClick={(e) => clickBooth(e, "ikapharmindo", "SP-2")}
            imgSrc="https://cdn.fkuwks.com/images/sponsors/logo-ikapharma.png"
            top="11%"
            right="39%"
            small
          />
          <HotspotImg
            onClick={(e) => clickBooth(e, "ferron", "SP-2")}
            imgSrc="https://cdn.fkuwks.com/images/sponsors/logo-ferron.png"
            top="13%"
            right="48%"
            small
          />
          <HotspotImg
            onClick={(e) => clickBooth(e, "interbat", "SP-8")}
            imgSrc="https://cdn.fkuwks.com/images/sponsors/logo-interbat.png"
            top="15%"
            left="36.5%"
            small
          />
          <HotspotImg
            onClick={(e) => clickBooth(e, "whoto", "SP-2")}
            imgSrc="https://cdn.fkuwks.com/images/sponsors/logo-proderma.png"
            top="16%"
            left="26%"
            small
          />
          <HotspotImg
            onClick={(e) => clickBooth(e, "roysurya", "SP-2")}
            imgSrc="https://cdn.fkuwks.com/images/sponsors/logo-roi.png"
            top="18%"
            left="13%"
            small
          />
          <HotspotImg
            onClick={(e) => clickBooth(e, "sdm", "SP-5")}
            imgSrc="https://cdn.fkuwks.com/images/sponsors/logo-sdm.png"
            top="36%"
            right="4%"
          />
          <HotspotImg
            onClick={(e) => clickBooth(e, "hyphens", "SP-7")}
            imgSrc="https://cdn.fkuwks.com/images/sponsors/logo-hyphens.png"
            top="25%"
            right="25%"
          />
          <HotspotImg
            onClick={(e) => clickBooth(e, "dermaxp", "SP-1")}
            imgSrc="https://cdn.fkuwks.com/images/sponsors/logo-dermaxp.png"
            top="33%"
            left="17%"
          />
          <HotspotImg
            onClick={(e) => clickBooth(e, "galderma", "SP-3")}
            imgSrc="https://cdn.fkuwks.com/images/sponsors/logo-galaderma.png"
            top="43%"
            right="22%"
          />
          <HotspotImg
            onClick={(e) => clickBooth(e, "bioderma", "SP-4")}
            imgSrc="https://cdn.fkuwks.com/images/sponsors/logo-bioderma.png"
            top="32%"
            right="46%"
          />
          <HotspotImg
            onClick={(e) => clickBooth(e, "laroche", "SP-6")}
            imgSrc="https://cdn.fkuwks.com/images/sponsors/logo-laroche.png"
            top="60%"
            right="78%"
          />
          <HotspotImg
            onClick={(e) => toWebinar(e)}
            imgSrc="zoom-logo.png"
            top="60%"
            left="45%"
          />
          <div style={{ position: "absolute", bottom: "0", right: "0" }}>
            <a className="btn-hall" onClick={(e) => setShowWinners(true)}>
              Informasi Pemenang
            </a>
            {jenisPeserta.includes("Simposium") ? (
              <a className="btn-hall" onClick={(e) => setShowSertif(true)}>
                Sertifikat
              </a>
            ) : (
              ""
            )}
            <a className="btn-hall" onClick={(e) => setShowRecord(true)}>
              Rekaman
            </a>
            <a className="btn-hall" onClick={(e) => setShowQnA(true)}>
              Q &amp; A
            </a>
          </div>
          <div style={{ position: "absolute", top: "0", left: "0" }}>
            <a className="btn-logout" onClick={(e) => setShowLogout(true)}>
              Keluar
            </a>
          </div>

          <PopupWinners onClose={popupCloseHandler} show={showWinners} />
          <PopupSertif onClose={popupCloseHandler} show={showSertif} jp={jenisPeserta} name={props.name} />
          {/* <Popup
            onClose={popupCloseHandler}
            show={showSertif}
            title="Daftar Sertifikat"
          >
            <p>
              Sertifikat Simposium FKUWKS - PKBKULIT 2022
              <br />
              <Button
                onClick={(e) =>
                  generatePdf(
                    "Simposium",
                    publicRuntimeConfig.base + "/sertifikat/simposium.jpg"
                  )
                }
              >
                Unduh Sertifikat
              </Button>
            </p>
            {jenisPeserta === "Pameran, Simposium dan Workshop" ? <p>
              Sertifikat Workshop FKUWKS - PKBKULIT 2022
              <br />
              <Button
                onClick={(e) =>
                  generatePdf(
                    "Workshop",
                    publicRuntimeConfig.base + "/sertifikat/workshop.jpg"
                  )
                }
              >
                Unduh Sertifikat
              </Button>
            </p> : ''}
          </Popup> */}

          <PopupRecords
            onClose={popupCloseHandler}
            show={showRecord}
            recordps={recordps}
            recordps2={recordps2}
          />

          <PopupQnA onClose={popupCloseHandler} show={showQnA} />

          <PopupMsg
            onClose={popupCloseHandler}
            msg={errorMsg}
            zoomStatus={zoomStatus}
            urlZoom={Urlzoom}
          />

          <PopupLogout
            onClose={popupCloseHandler}
            show={showLogout}
            logout={logout}
          />
        </div>
      </div>
    </>
  );
}
