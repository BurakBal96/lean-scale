import React from 'react'
import {Button} from 'components'
import {Posts} from "./Posts"
import {Channels} from "./Channels"
import {Follows} from "./Follows"


export const Hub = () => {
  return (
    <div className="hub">
      <div className="hub-header">
        <div className="text">
          <div className="title">Games Hub</div>
          <div className="description">
            The best offers, new games, AAA titles and high-quality video
            games..
          </div>
        </div>
        <Button className="primary-btn light small">Discover All</Button>
      </div>

      <div className="content">
        <Posts />
        <Channels />
        <Follows />
      </div>
    </div>
  )
}
