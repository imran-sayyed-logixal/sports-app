import React, { useEffect, useState } from "react";
import uuid from 'react-uuid';
import axios from "axios";
import "./app.css";

function App() {
  const [playerList, setPlayersList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `https://api.npoint.io/20c1afef1661881ddc9c`
      );
      console.log(res.data.playerList);
      setPlayersList(res.data.playerList);
    }
    getData();
  }, []);

  const filteredPlayers = playerList.filter((player) => {
    return player.PFName.toLowerCase().includes(search.toLowerCase()) || player.TName.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Search Player...." onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="row">
        {
          filteredPlayers.sort((a, b) => a.name > b.name ? 1 : -1).map((player) => {
            return (
              <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={uuid()}>
                <div className="card mb-3">
                  <img src={`/assets/${player.Id}.jpg`} className="card-img-top" alt="player.jpg" />
                  <div className="card-body">
                    <h6 className="card-title"><b>Full Name : </b>{player.PFName}</h6>
                    <p className="card-text"><span>Skill : </span>{player.SkillDesc}</p>
                    <p className="card-text"><span>Player Value : </span>${player.Value}</p>
                    <p className="card-text"><span>Upcoming Match : </span>{player.UpComingMatchesList[0].CCode} vs. {player.UpComingMatchesList[0].VsCCode}</p>
                    <p className="card-text"><span>Next match : </span>{(new Date(player.UpComingMatchesList[0].MDate)).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
