/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useRouter } from "next/router";
import importScript from "components/importScript";
import getConfig from "next/config";
import Head from "next/head";
import Hotspot from "components/hotspot";

const { publicRuntimeConfig } = getConfig();

export default function Booth(props) {
  importScript(`${publicRuntimeConfig.base}/js/jquery.magnific-popup.min.js`);
  importScript(`${publicRuntimeConfig.base}/js/main.js`);

  const router = useRouter();
  const handleOnClick = (e) => {
    e.preventDefault();
    console.log("Kembali ke home");
    router.push("/");
  };

  const namaSponsor =
    router.query.namaSponsor !== undefined
      ? `${router.query.namaSponsor || " - Virtual Booth"}`
      : "Sponsor - Virtual Booth";

      useEffect(() => {
        router.beforePopState(({ as }) => {
          if (as === '/vbooth/main-hall') {
            router.replace({
              pathname: '/main-hall',
              query: { from: 'booth' }
            }, '/main-hall',)
            return false
          }
    
          return true
        })
      }, [router])

  return (
    <>
      <Head>
        <title>{namaSponsor}</title>
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
          src={`${props.base}/videos/03 - sikuen booth.mp4`}
          type="video/mp4"
        />
      </video>

      <div id="sikuen2" className="hide">
        <img
          id="latar"
          className="latar"
          src={`${props.base}/images/booth_platinum.jpg`}
        />
        <div id="hotspots">
          <Hotspot
            popup="https://www.youtube.com/watch?v=OeGpf1MyM2M"
            iconName="no-icon"
            top="42%"
            right="28%"
          />
          <Hotspot
            popup="images/poster5.jpg"
            iconName="no-icon"
            top="42%"
            right="36%"
          />
        </div>
      </div>
    </>
  );
}
