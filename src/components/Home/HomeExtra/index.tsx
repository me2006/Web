import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";

import styles from "./style.module.css";

export default function HomeExtra(): ReactNode {
  return (
    <section>
      <div className={clsx("row", styles.extraCardContainer)}>

        {/* Join the Team card */}
        <div className={clsx("col", styles.extraCard)}>
          <h1>Join the Team!</h1>
          <div className={clsx("row", styles.extraCardContent)}>
            <div className="col col--5">
              <img src={useBaseUrl("/img/home/kablooey_repair.png")} style={{ borderRadius: "50%" }} />
            </div>
            <div className="col col--7">
              <p>Are you a programmer, artist, animator, writer, or website designer? Interested in working on Sitekick Remastered?</p>
              <Link
                className="button margin--sm"
                to="/docs/development/join_the_team">
                Learn more!
              </Link>
            </div>
          </div>
        </div>

        {/* Multi-Device Support card */}
        <div className={clsx("col", styles.extraCard)}>
          <h1 >Multi-Device Support</h1>
          <div className={clsx("row", styles.extraCardContent)}>
            <div className={clsx("col", styles.lOrder)}>
              <p>
                Sitekick Remastered is available on Google Play and the Microsoft Store. MacOS/Linux users are able to play through an Android Emulator. <b>iOS support is not planned at this time.</b>
              </p>
            </div>
            <div className={clsx("col", styles.rOrder)}>
              <img src={useBaseUrl("/img/home/devices.png")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
