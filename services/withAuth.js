import cookies from "next-cookies";
import axios from "axios";

export async function protectPage(ctx) {
  const token = cookies(ctx).token;
  if (token) {
 
    try {
      const res = await axios.get(process.env.BASE_URL + "/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(1);
      return {
        props: {
          token,
          name: res.data.data.name,
        },
      };
    } catch (err) {
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
}
/////////////////////////
export async function checkAuthWithRedirect(ctx, url) {
  const token = cookies(ctx).token;
  if (token) {
    return {
      token,
      redirect: {
        destination: url || "welcome",
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}

/////////////////////////
export async function userAuthenticated(ctx) {
  const token = cookies(ctx).token;
  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
}
