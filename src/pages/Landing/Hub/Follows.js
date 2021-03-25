import React from 'react'
import {inject, observer} from 'mobx-react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {kFormatter} from 'helpers'
import {Button} from "components"
import {ReactComponent as AddContact} from "images/add-contact.svg"

const FollowItem = ({data}) => {
  return (
    <div className="follow-item">
      <img className="image" src={data.photo} alt={data.name + ' image'} />
      <div className="ml-12">
        <div className="follow-name">{data.name}</div>
        <div className="follow-users">{kFormatter(data.followers)} Followers</div>
      </div>
      <AddContact className="btn basic-btn add-contact" />
    </div>
  )
}

export const Follows = inject('FollowsStore')(
  observer(props => {
    useDeepCompareEffect(() => {
      props.FollowsStore.read({})
    }, [props.FollowsStore])
    const {list} = props.FollowsStore

    return (
      <div className="hub-follows">
        <div className="title">Who to follow?</div>

        {list.map(i => (
          <FollowItem data={i} />
        ))}
        <Button className="primary-btn light small mt-26 per-50">Find More</Button>
      </div>
    )
  })
)
