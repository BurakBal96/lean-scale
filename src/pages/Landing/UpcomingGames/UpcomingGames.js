import React from 'react'
import {Button} from 'components'
import {inject, observer} from 'mobx-react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {AiFillHeart} from 'react-icons/all'

const UpcomingGamesItem = ({data}) => {
  return (
    <div className="upcoming-games-item">
      <div
        className="image"
        style={{backgroundImage: `url(${data.photo || ''})`}}>
        <AiFillHeart className="upcoming-games-icon" />
      </div>
      <span className="name">{data.name}</span>
      <span className="current-price">
        {data.currency}
        {(data.full_price * (1 - data.discount)).toFixed(2)}
      </span>
      <div>
        <span className="full-price">
          {data.currency}
          {(data.full_price || 0).toFixed(2)}
        </span>
        <span className="discount">{(data.discount * 100).toFixed()}% OFF</span>
      </div>
      <Button className="primary-btn per-100 fs-16 mt-10">Pre Order</Button>
    </div>
  )
}

export const UpcomingGames = inject('UpcomingGamesStore')(
  observer(props => {
    useDeepCompareEffect(() => {
      props.UpcomingGamesStore.read({})
    }, [props.UpcomingGamesStore])
    const {list} = props.UpcomingGamesStore

    return (
      <div className="upcoming-games">
        <div className="upcoming-games-header">
          <div className="text">
            <div className="title">Upcoming Games</div>
            <div className="description">
              Pre-order an upcoming game to start playing on Day 1.
            </div>
          </div>
          <Button className="primary-btn light">Discover All</Button>
        </div>

        <div className="content">
          {list.map(i => (
            <UpcomingGamesItem data={i} />
          ))}
        </div>

        <div className="per-100 horizon center mt-30">
          <Button className="primary-btn light per-20">LOAD MORE</Button>
        </div>
      </div>
    )
  })
)
