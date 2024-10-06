import Head from "next/head";

const SEO = ({ pageTitle }) => (
  <>
    <Head>
      <title>
        {pageTitle
          ? `${pageTitle} - My Sweet Wishes Gift Shop`
          : "My Sweet Wishes Gift Shop - Your Favorite Gift Destination"}
      </title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="description"
        content="Discover a variety of unique gifts, carefully crafted and designed for all occasions. Shop at My Sweet Wishes Gift Shop, where your satisfaction and privacy matter most."
      />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="author" content="My Sweet Wishes" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="language" content="English" />
      <meta
        name="keywords"
        content="gift shop, personalized gifts, privacy policy, secure payments, Razorpay, online shopping, unique gifts, custom gifts"
      />
      <meta name="theme-color" content="#990100" />
      <meta name="revisit-after" content="30 days" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  </>
);

export default SEO;
