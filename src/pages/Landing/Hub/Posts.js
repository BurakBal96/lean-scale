import {ReactComponent as Pro} from 'images/pro.svg'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {Button, LongText} from 'components'
import {ReactComponent as Share} from 'images/share.svg'
import {ReactComponent as Repost} from 'images/repost.svg'
import {ReactComponent as ClickedCelebrate} from 'images/celebrate-clicked.svg'
import {ReactComponent as Celebrate} from 'images/celebrate.svg'
import {kFormatter} from 'helpers'
import {ReactComponent as Comments} from 'images/comments.svg'
import {inject, observer} from 'mobx-react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import React from 'react'

const PostItem = ({data}) => {
  return (
    <div className="user-post">
      <div className="title">
        <img
          className="image"
          src={data.photo}
          alt={data.username + ' photo'}
        />

        <div className="per-100 horizon between">
          <div className="info">
            <div className="horizon middle">
              <span className="nickname mr-10">{data.nickName}</span>
              {data.pro && <Pro />}
            </div>
            <div>
              <Link className="username" to="/">
                @{data.userName}
              </Link>
              <span className="followers">{data.follower_count} Followers</span>
            </div>
          </div>

          <div className="date">{moment(data.date).fromNow()}</div>
        </div>
      </div>

      <LongText className="post" limit={150} moreText="Read More" fs="fs-13">
        {data.post}
      </LongText>

      <div className="actions">
        <div className="left">
          <Share className="action-button" />
          <Repost className="action-button" />
          {data.celebrated ? (
            <ClickedCelebrate className="action-button" />
          ) : (
            <Celebrate className="action-button" />
          )}
          {data.celebrate_count ? (
            <span className="celebrate-count">
              {kFormatter(data.celebrate_count)}
            </span>
          ) : null}
        </div>

        <div className="right">
          {data.comment_count ? (
            <Button className="basic-btn comment-count">{data.comment_count} Comments</Button>
          ) : (
            <Button className="basic-btn mr-10">Add your comment</Button>
          )}
          <Comments className="btn basic-btn" />
        </div>
      </div>
    </div>
  )
}

export const Posts = inject('PostsStore')(
  observer(props => {
    useDeepCompareEffect(() => {
      props.PostsStore.read({})
    }, [props.PostsStore])
    const {list} = props.PostsStore

    return (
      <div className="hub-posts mr-36">
        <div className="title">
          Latest Posts
        </div>
        {list.map(i => (
          <PostItem data={i} />
        ))}
      </div>
    )
  })
)
