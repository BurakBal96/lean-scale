import {action, computed, makeObservable, observable} from 'mobx'
import {BasicModel as Model, BasicMeta as Meta} from '../models'
import moment from 'moment'

const mockData = {
  meta: {
    count: 3,
    total: 25000,
  },
  items: [
    {
      id: 0,
      order: 0,
      nickName: 'MrPaladin',
      userName: 'mrpaladin',
      photo: 'images/MrPaladin.jpg',
      follower_count: 15,
      comment_count: 15,
      post:
        'Sniper isnt overpowered. \n' +
        'Sniper has some of the lowest damage outputs in the game. 50 damage per shot is terrible, especially with the fire rate.\n' +
        'Compared to heavy, who has 400+ DPS!. tell me how sniper compares.',
      celebrate_count: 296,
      date: moment().add(-3, 'hours').toISOString(),
      pro: false,
      celebrated: true,
    },
    {
      id: 1,
      order: 1,
      nickName: 'LeroyJenkins',
      userName: 'leroyjenkins',
      photo: 'images/leroyjenkins.jpg',
      follower_count: 3253,
      comment_count: 0,
      post:
        "It'll still be long enough that it cannot be spammed. But will increase usefulness of the watch by not..",
      celebrate_count: 0,
      date: moment().add(-15, 'minutes').toISOString(),
      pro: true,
      celebrated: false,
    },
    {
      id: 2,
      order: 2,
      nickName: 'ONYXSnake1223',
      userName: 'ONYXSnake1223',
      photo: 'images/ONYXSnake1223.jpg',
      follower_count: 125,
      comment_count: 156,
      post:
        "It'll still be long enough that it cannot be spammed. But will increase usefulness of the watch by not..",
      celebrate_count: 1234,
      date: moment().add(-15, 'minutes').toISOString(),
      pro: true,
      celebrated: false,
    },
  ],
}

export default class PostsStore {
  state = 'pending' // "pending" / "fetching", "done" / "error"
  meta = {}
  _list = new observable.map()

  constructor(Stores) {
    this.stores = Stores

    makeObservable(this, {
      _list: observable,
      state: observable,
      meta: observable,

      list: computed,

      read: action,

      fetchSuccess: action.bound,
      handleError: action.bound,
    })
  }

  read({id, params = {}}) {
    // if (id) {
    //   this.state = 'getting'
    //   Service.detail({id, params, client_id}).then(res => {
    //     this._item = new Model(res.item || {})
    //     this.state = 'done'
    //   }, this.handleError)
    // } else {
    this.state = 'listing'
    // Service.read({params, client_id}).then(
    //   this.fetchSuccess,
    //   this.handleError
    // )
    this.fetchSuccess(mockData)
    // }
  }

  fetchSuccess(res) {
    if (res.items)
      res.items
        .sort((a, b) => a.order < b.order)
        .forEach(i => {
          const item = new Model(i || {})
          this._list.set(item.id, item)
        })
    if (res.meta) this.meta = new Meta(res.meta)
    this.state = 'done'
  }

  handleError(error) {
    this.state = 'error'
    return this.stores.SystemMessageStore.handleError(error)
  }

  get list() {
    return [...this._list.values()]
  }
}
