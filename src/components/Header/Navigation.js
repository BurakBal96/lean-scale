import React from 'react'
import {ReactComponent as Home} from "images/home.svg"
import {ReactComponent as Tournament} from "images/tournement.svg"
import {ReactComponent as Market} from "images/market.svg"
import {ReactComponent as Games} from "images/games.svg"

export const Navigation = () => {

  const handleNavigate = () => null

  return <div className="navigation horizon between per-100">
    <button data-page="home" onClick={handleNavigate} className="item active">
      <Home />
      Home
    </button>

    <button data-page="social" onClick={handleNavigate} className="item">
      <Games />
      Social
    </button>

    <button data-page="market" onClick={handleNavigate} className="item">
      <Market />
      Market
    </button>

    <button data-page="tournament" onClick={handleNavigate} className="item">
      <Tournament />
      Tournaments
    </button>

  </div>
}