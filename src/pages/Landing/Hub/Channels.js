import React from 'react'
import {inject, observer} from 'mobx-react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {kFormatter} from 'helpers'
import {Button} from "components"

const ChannelItem = ({data}) => {
  return (
    <div className="channel-item">
      <img className="image" src={data.photo} alt={data.name + ' image'} />
      <div className="ml-12">
        <div className="channel-name">#{data.name}</div>
        <div className="channel-users">{kFormatter(data.users)} Users</div>
      </div>
    </div>
  )
}

export const Channels = inject('ChannelsStore')(
  observer(props => {
    useDeepCompareEffect(() => {
      props.ChannelsStore.read({})
    }, [props.ChannelsStore])
    const {list} = props.ChannelsStore

    return (
      <div className="hub-channels mr-36">
        <div className="title">Channels</div>

        {list.map(i => (
          <ChannelItem data={i} />
        ))}
        <Button className="primary-btn light small mt-26 per-50">Find More</Button>
      </div>
    )
  })
)
