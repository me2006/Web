import { type ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

export default function RegistrationSuccess(): ReactNode {

  return (
    <Layout title={"Registration Successful"} description="Clickity-click, it's Sitekick!">
      <main style={{ minHeight: "calc(100vh - 300px)", margin: "2rem auto", display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Heading as="h1" style={{ fontSize: "3rem" }}>Registration Successful!</Heading>
        <p style={{ fontSize: "1.5rem" }}>Your registration is complete! You may now login to the game.</p>
        {/* TODO: Add a cool image here */}
      </main>
    </Layout>
  );
}
