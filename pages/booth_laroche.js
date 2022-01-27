/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useRouter } from "next/router";
import importScript from "components/importScript";
import getConfig from "next/config";
import Head from "next/head";
import cookies from "next-cookies";
import axios from "axios";
import Dot from "components/dot";
const { publicRuntimeConfig } = getConfig();

function BoothLaroche(props) {
  importScript(`${publicRuntimeConfig.base}/js/jquery.magnific-popup.min.js`);
  importScript(`${publicRuntimeConfig.base}/js/main.js`);

  const sponsor = "La Roche Posay";
  const filesponsor = props.sponsorfile;
  const router = useRouter();
  const toMainHall = (e) => {
    router.replace(
      {
        pathname: "/main-hall",
        query: { fromB: "bioderma" },
      },
      "/main-hall"
    );
  };

  const sortFiles = (prop) => {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  };

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (window.getPopup() !== null) window.closePopup();

      if (as === `${publicRuntimeConfig.base}main-hall`) {
        router.replace(
          {
            pathname: "/main-hall",
            query: { fromB: "laroche" },
          },
          "/main-hall"
        );
        return false;
      }

      return true;
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>{sponsor} - Virtual Booth</title>
        <meta name="description" content="PKBKULIT - FKUWKS" />
      </Head>

      <video
        id="sikuen"
        className="latar"
        autoPlay
        muted
        onEnded={() => window.showHotspots()}
      >
        <source
          src={`${props.base}/booth/laroche_in.mp4`}
          type="video/mp4"
        />
      </video>

      <div id="sikuen2" className="hide">
        {/* <img
          id="latar"
          className="latar"
          src={`${props.base}/images/booth_platinum.jpg`}
        /> */}
        <div id="hotspots">
          <Dot
            popup={filesponsor[0] === undefined ? '' : filesponsor[0].File}
            iconName="bi-record-circle"
            top="43.5%"
            left="17.3%"
          />
          <Dot
            popup={filesponsor[1] === undefined ? '' : filesponsor[1].File}
            iconName="bi-record-circle"
            top="41%"
            left="29.5%"
          />
          <Dot
            popup={filesponsor[2] === undefined ? '' : filesponsor[2].File}
            iconName="bi-record-circle"
            top="54.5%"
            left="27.5%"
          />
          <Dot
            popup={filesponsor[3] === undefined ? '' : filesponsor[3].File}
            iconName="bi-record-circle"
            top="43.5%"
            left="37%"
          />
          <Dot
            popup={filesponsor[4] === undefined ? '' : filesponsor[4].File}
            iconName="bi-record-circle"
            top="54.5%"
            left="37%"
          />
          <Dot
            popup={filesponsor[5] === undefined ? '' : filesponsor[5].File}
            iconName="bi-play-circle"
            top="41%"
            left="52%"
          />
          <Dot
            popup={filesponsor[6] === undefined ? '' : filesponsor[6].File}
            iconName="bi-record-circle"
            top="59%"
            left="48.5%"
          />
          <Dot
            popup={filesponsor[8] === undefined ? '' : filesponsor[8].File}
            iconName="bi-record-circle"
            top="59%"
            left="53.5%"
          />
          <Dot
            popup={filesponsor[9] === undefined ? '' : filesponsor[9].File}
            iconName="bi-record-circle"
            top="42%"
            right="40%"
          />
          <Dot
            popup={filesponsor[10] === undefined ? '' : filesponsor[10].File}
            iconName="bi-record-circle"
            top="51%"
            right="38.4%"
          />
          <Dot
            popup={filesponsor[9] === undefined ? '' : filesponsor[9].File}
            iconName="bi-play-circle"
            top="44%"
            right="26%"
          />
          <Dot
            popup={filesponsor[10] === undefined ? '' : filesponsor[10].File}
            iconName="bi-record-circle"
            top="51%"
            right="29.2%"
          />
          <div style={{ position: "absolute", bottom: "0", left: "0" }}>
            <a className="btn-hall" onClick={(e) => toMainHall(true)}>
              Kembali Ke Main Hall
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const token = cookies(ctx).token;
  if (token) {
    try {
      const res = await axios.get(process.env.BASE_URL + "/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const datasponsor = await axios.get(process.env.BASE_URL + '/get-by-sponsorid/SP-4', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return {
        props: {
          token,
          name: res.data.data.name,
          sponsorfile:datasponsor.data.data,

        },
      };
    } catch (err) {
      console.log(err)
      return {
        redirect: {
          destination: process.env.REDIRECT_LOGIN,
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: process.env.REDIRECT_LOGIN,
        permanent: false,
      },
    };
  }
};

export default BoothLaroche;