import {action, computed, makeObservable, observable, toJS} from 'mobx'
import {BasicModel as Model, BasicMeta as Meta} from '../models'

const mockData = {
  meta: {
    count: 9,
    total: 25000,
  },
  items: [
    {
      id: 0,
      order: 0,
      name: "social Hub",
      users: 195563,
      photo: "images/wow.jpg"
    },
    {
      id: 1,
      order: 1,
      name: "Fortnite",
      users: 240563,
      photo: "images/fortnite.jpg"
    },
    {
      id: 2,
      order: 2,
      name: "World of War Craft",
      users: 195563,
      photo: "images/wow.jpg"
    },
    {
      id: 3,
      order: 3,
      name: "PUBG Mobile",
      users: 220563,
      photo: "images/pubg.jpg"
    },
    {
      id: 4,
      order: 4,
      name: "HearthStone",
      users: 175651,
      photo: "images/wow.jpg"
    },
    {
      id: 5,
      order: 5,
      name: "CS:GO",
      users: 195563,
      photo: "images/csgo.jpg"
    },
    {
      id: 6,
      order: 6,
      name: "Call of Duty",
      users: 195563,
      photo: "images/cod.jpg"
    },
    {
      id: 7,
      order: 7,
      name: "Overwatch",
      users: 195563,
      photo: "images/overwatch.jpg"
    },
    {
      id: 8,
      order: 8,
      name: "Diablo III",
      users: 195563,
      photo: "images/diablo.jpg"
    },
  ],
}

export default class ChannelsStore {
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
