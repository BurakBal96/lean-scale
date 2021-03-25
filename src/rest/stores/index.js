import SystemMessageStore from './SystemMessageStore'
import HighlightGameStore from './HighlightGameStore'
import PostsStore from './PostsStore'
import ChannelsStore from './ChannelsStore'
import FollowsStore from './FollowsStore'
import UpcomingGamesStore from './UpcomingGamesStore'

class RootStore {
  constructor() {
    this.SystemMessageStore = new SystemMessageStore(this)
    this.HighlightGameStore = new HighlightGameStore(this)
    this.PostsStore = new PostsStore(this)
    this.ChannelsStore = new ChannelsStore(this)
    this.FollowsStore = new FollowsStore(this)
    this.UpcomingGamesStore = new UpcomingGamesStore(this)
  }
}

export const stores = new RootStore()
