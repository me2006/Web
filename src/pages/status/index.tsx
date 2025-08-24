import Layout from "@theme/Layout";

export default function Status() {
  return (
    <Layout title={"Status"} description="Clickity-click, it's Sitekick!">
      {/* Manual height, but I don't want to bypass CORS */}
      <iframe
        src="https://status.sitekickremastered.com/status/site"
        title="Sitekick Remastered Uptime Kuma Status Page"
        style={{ minHeight: "1523.8px" }}
      />
    </Layout>
  );
}

