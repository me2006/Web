import { type ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

export default function RegistrationSuccess(): ReactNode {

  return (
    <Layout title={"Registration Successful"} description="Clickity-click, it's Sitekick!">
      <main className="d-flex flex-col justify-content-center m-2a reg-page-size">
        <Heading as="h1" className="fontsize-3">Registration Successful!</Heading>
        <p className="fontsize-1_5">Your registration is complete! You may now login to the game.</p>
        {/* TODO: Add a cool image here */}
      </main>
    </Layout>
  );
}
