import {action, computed, makeObservable, observable} from 'mobx'
import {BasicModel as Model, BasicMeta as Meta} from '../models'
import moment from 'moment'

const mockData = {
  meta: {
    count: 5,
    total: 25000,
  },
  items: [
    {
      id: 0,
      order: 0,
      photo: 'https://s1.gaming-cdn.com/images/products/5757/orig/world-of-warcraft-shadowlands-cover.jpg',
      name: "World of Warcraft: Shadowlands (Heroic Edition)",
      full_price: 22.5,
      currency: "€",
      discount: 0.62,
   },
    {
      id: 1,
      order: 1,
      photo: 'https://www.oyunfor.com/Public/upload/urunler/8010/urunResimYeni/biomutant-steam-key.jpg',
      name: "Biomutant Steam Key ARABIC",
      full_price: 54.49,
      currency: "€",
      discount: 0.62,
    },
    {
      id: 2,
      order: 2,
      photo: 'https://cdn-products.eneba.com/resized-products/Q02hpCi1NiyRogxVm9KisRA0Y8HjKM4nqlvw6E9FeiM_350x200_1x-0.jpeg',
      name: "Watch Dogs: Legion Uplay Key",
      full_price: 37.99,
      currency: "€",
      discount: 0.62,
    },
    {
      id: 3,
      photo: "https://cdn-products.eneba.com/resized-products/YoaxWX19Mgq8p_jago-MDUWj9xpN93A4kbRCOEbXpMA_350x200_1x-0.jpg",
      order: 3,
      name: "Vampire: The Masquerade - Bloodlines 2 Steam Key",
      full_price: 4.36,
      currency: "€",
      discount: 0.15,
    },
    {
      id: 4,
      order: 4,
      photo: "https://oyunkeyal.com/wp-content/uploads/2020/12/football-manager-2021-cover-600x900.jpg",
      name: "Football Manager 2021 Steam Key",
      full_price: 41.79,
      currency: "€",
      discount: 0.15,
    }
  ],
}

export default class UpcomingGamesStore {
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
