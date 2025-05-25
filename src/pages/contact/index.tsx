import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

import styles from "./index.module.css";

export default function Contact(): ReactNode {
  return (
    <Layout title={"Contact"} description="Clickity-click, it's Sitekick!">
      <main className={styles.contactContainer}>
        <div className={styles.contactHeader}>
          <div>
            <Heading as="h1">Contact Us</Heading>
            <p>Have any questions, feedback, or want to share fan art? We'd love to hear from you!</p>
            <p>Feel free to reach out through the option below, or, if you prefer, you can email us directly at <Link to="mailto:admin@sitekickremastered.com">admin@sitekickremastered.com</Link></p>
          </div>
        </div>
        <div className={styles.kablooeyDiv}>
          <div>
            <Heading as="h1">Message us on Discord</Heading>
            <p>If you have a general question, you should join our <Link className={styles.kablooeyA} to="http://discord.sitekickremastered.com/">Discord server</Link> and ask a question in the <b>#general</b>, <b>#game-chat</b>, or <b>#sitekick-dev</b> channels.</p>
            <p>If you have a private question (ex. Account related questions, player reports, or security questions), please message our Modmail bot, Kablooey:</p>
            <div>
              <Link className="button" to="https://discordapp.com/channels/@me/653394550580183050">Message Kablooey!</Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
