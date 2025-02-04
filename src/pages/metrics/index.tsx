import Layout from "@theme/Layout";
import { useState, useEffect } from 'react';

export default function Status() {
  const [data, setData] = useState({});
  const getData = () => {
    fetch("https://game.sitekickremastered.com/metrics/generic?q=online_players,daily_online_players,daily_registrations,total_players,total_chips")
      .then((res) => { return res.json(); })
      .then((data) => { setData(data); })
      .catch((err) => {console.log(err); setData({}); });
  }
  
  useEffect(() => {
    getData();
    const interval = setInterval(() => getData(), 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout title={`Metrics`} description="Clickity-click, it's Sitekick!">
      { (Object.keys(data).length) ? 
      <div className="grid cards">
        <ul>
          <li>
            <p><strong>Players Online</strong></p>
            <hr />
              <p>There are <span>{data["online_players"]}</span> players online right now!</p>
          </li>
          <li>
            <p><strong>Total Members</strong></p>
            <hr />
              <p><span>{data["total_players"]}</span> members have registered since November 29, 2020.</p>
          </li>
          <li>
            <p><strong>New Players</strong></p>
            <hr />
              <p>Today <span>{data["daily_registrations"]}</span> new players registered.</p>
          </li>
          <li>
            <p><strong>Played Today</strong></p>
            <hr />
              <p><span>{data["daily_online_players"]}</span> players logged in today.</p>
          </li>
          <li>
            <p><strong>Total Chips</strong></p>
            <hr />
              <p>There are currently <span>{data["total_chips"]}</span> chips in circulation.</p>
          </li>
        </ul>
      </div>
      :
      <div>
        Failed to get metrics!
      </div>
      }
    </Layout>
  );
}

