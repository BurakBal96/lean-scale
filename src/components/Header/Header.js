import React from 'react'
import {Input} from "components"
import {ReactComponent as BrandIcon} from "images/icon.svg"
import {GoSearch, BsFillPersonFill, FaBell, BsFillHeartFill, RiShoppingBag3Fill, FaWallet} from "react-icons/all"
import {Navigation} from "./Navigation"

export const Header = () => {
  return <header className="header per-100">
    <div className="upper horizon per-100">
      <BrandIcon className="brand-icon" />
      <Input className="per-100" placeholder="Search games, gears, accessories..." icon={<GoSearch />} />
      <div className="horizon icons">
        <BsFillPersonFill className="active"/>
        <FaWallet />
        <FaBell />
        <BsFillHeartFill />
        <RiShoppingBag3Fill />
      </div>
    </div>

    <div className="lower horizon per-100">
      <Navigation />
    </div>


  </header>
}
