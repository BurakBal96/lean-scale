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
      name: "XMegatronX",
      followers: 325860,
      photo: "images/XMegatronX.jpg"
    },
    {
      id: 1,
      order: 1,
      name: "Rikimarue",
      followers: 240563,
      photo: "images/Rikimarue.jpg"
    },
    {
      id: 2,
      order: 2,
      name: "Wolfie",
      followers: 195563,
      photo: "images/Wolfie.jpg"
    },
    {
      id: 3,
      order: 3,
      name: "Thanon",
      followers: 220563,
      photo: "images/Thanon.jpg"
    },
    {
      id: 4,
      order: 4,
      name: "Rikimarue",
      followers: 175651,
      photo: "images/Rikimarue.jpg"
    },
    {
      id: 5,
      order: 5,
      name: "MrPaladin",
      followers: 195563,
      photo: "images/MrPaladin.jpg"
    },
    {
      id: 6,
      order: 6,
      name: "Supreme",
      followers: 195563,
      photo: "images/Supreme.jpg"
    },
    {
      id: 7,
      order: 7,
      name: "Murmur",
      followers: 195563,
      photo: "images/Murmur.jpg"
    },
    {
      id: 8,
      order: 8,
      name: "Loremiosum",
      followers: 195563,
      photo: "images/MrPaladin.jpg"
    },
  ],
}

export default class FollowsStore {
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
