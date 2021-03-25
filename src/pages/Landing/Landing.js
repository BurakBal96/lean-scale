import React from 'react'
import {Highlights} from './Highlights/Highlights'
import {Hub} from './Hub/Hub'
import {UpcomingGames} from './UpcomingGames/UpcomingGames'
import {BestDeals} from './BestDeals/BestDeals'

export const Landing = props => {
  return (
    <div>
      <Highlights />
      <Hub />
      <UpcomingGames />
      <BestDeals />
    </div>
  )
}
