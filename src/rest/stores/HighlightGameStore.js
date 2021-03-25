import {action, computed, makeObservable, observable} from 'mobx'
import {BasicModel as Model, BasicMeta as Meta} from '../models'
// import {HighlightGameServices as Service} from '../services'

const mockData = {
  meta: {
    count: 5,
    total: 25000,
  },
  items: [
    {
      id: 0,
      order: 0,
      src: 'valhalla.jpg',
      description:
        'Become a legendary Viking warrior raised on tales of battle and glory.',
      alt: 'valhalla',
    },
    {
      id: 1,
      order: 1,
      src: 'got.webp',
      description:
        'Become a legendary Samurai raised on tales of battle and glory.',
      alt: 'ghost_of_tsushima',
    },
    {
      id: 4,
      order: 4,
      src: 'lou2.jpg',
      description: 'Become a legendary girl',
      alt: 'last_of_us_ii',
    },
    {
      id: 3,
      order: 3,
      src: 'hades.jpg',
      description:
        "Hades is a god-like rogue-like dungeon crawler that combines the best aspects of Supergiant's critically acclaimed titles",
      alt: 'last_of_us_ii',
    },
    {
      id: 2,
      order: 2,
      src: 'valheim.jpg',
      description:
        'A brutal exploration and survival game for 1-10 players, set in a procedurally-generated purgatory inspired by viking culture. Battle, build, and conquer your way to a saga worthy of Odin’s patronage!',
      alt: 'last_of_us_ii',
    },
  ],
}

export default class HighlightGameStore {
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
