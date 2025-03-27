import Head from "next/head";
import CustomNavbar from "../components/Navbar";

const MainLayout = ({ children, title = "Spotify Clone" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
      </Head>

      <CustomNavbar />
      <main className="main-container">{children}</main>
    </>
  );
};

export default MainLayout;
