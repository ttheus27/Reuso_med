import Head from "next/head";

const Seo = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link href="/favicon.ico" rel="icon" />
      <meta
        name="description"
        content="Warlike - Admin &amp; Dashboard Template"
      />
      <meta
        name="author"
        content="Dashboard"
      />
      <meta
        name="keywords"
        content="react bootstrap dashboard
admin dashboard template
react nextjs admin template
react next js admin dashboard
admin dashboard nextjs
next js admin dashboard
admin panel template react bootstrap
react bootstrap dashboard template
nextjs dashboard
next js dashboard template
react bootstrap admin template
react next js admin panel dashboard template
react admin dashboard template
dashboard template react bootstrap
admin and dashboard template"
      ></meta>
    </Head>
  );
};

export default Seo;
