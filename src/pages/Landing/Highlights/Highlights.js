import React, {useMemo, useState} from 'react'
import {inject, observer} from 'mobx-react'
import {Button} from 'components'
import {useInterval} from 'helpers'
import useDeepCompareEffect from 'use-deep-compare-effect'

const GAME_CHANGE_DELAY = 4000
const MANUAL_GAME_CHANGE_DELAY = 10000

const mod = (m, n) => {
  return ((n % m) + m) % m
}

const Navigator = ({current, setCurrent, count = 0}) => {
  const handleClick = e => setCurrent(Number(e.currentTarget.dataset.index))

  return (
    <div className="highlight-games-navigation">
      {Array.from({length: count}).map((_, i) => (
        <button
          onClick={handleClick}
          data-index={i}
          className={'oval' + (i === current ? ' active' : '')}
        />
      ))}
    </div>
  )
}

export const Highlights = inject('HighlightGameStore')(
  observer(props => {
    const [current, setCurrent] = useState(0)
    const [isManualChanged, setManualChange] = useState(false)
    const [timeoutId, setTimeoutId] = useState(null)

    useInterval(
      () => {
        setCurrent(mod(list.length, current + 1))
      },
      isManualChanged ? null : GAME_CHANGE_DELAY
    )

    const {list, meta} = props.HighlightGameStore
    useDeepCompareEffect(() => {
      props.HighlightGameStore.read({})
    }, [props.HighlightGameStore])

    const left = useMemo(() => {
      return list.find(i => i.order === mod(meta.count, current - 1)) || {}
    }, [list, current, meta.count])

    const middle = useMemo(() => {
      return list.find(i => i.order === mod(meta.count, current)) || {}
    }, [list, current, meta.count])

    const right = useMemo(() => {
      return list.find(i => i.order === mod(meta.count, current + 1)) || {}
    }, [list, current, meta.count])

    const delayTheInterval = () => {
      setManualChange(true)
      if (timeoutId) clearTimeout(timeoutId)

      const id = setTimeout(() => {
        setTimeoutId(null)
        setManualChange(false)
      }, MANUAL_GAME_CHANGE_DELAY)
      setTimeoutId(id)
    }

    const handlePrev = () => {
      setCurrent(mod(meta.count, current - 1))
      delayTheInterval()
    }

    const handleNext = () => {
      setCurrent(mod(meta.count, current + 1))
      delayTheInterval()
    }

    return (
      <div className="highlight-games mt-40">
        <div className="games horizon per-100">
          <div className="item previous-item">
            <div
              className="img previous-img"
              style={{
                backgroundImage: `url(images/${left.src || ''})`,
              }}
            />
            <Button
              onClick={handlePrev}
              className="secondary-btn small light mr-36 fs-14">
              PREV
            </Button>
          </div>

          <div className="item current-item">
            <div className="description vertical bottom">
              <span>{middle.description || ''}</span>
              <Navigator
                current={current}
                setCurrent={setCurrent}
                count={meta.count}
              />
            </div>
            <div
              className="img current-img"
              style={{
                backgroundImage: `url(images/${middle.src || ''})`,
              }}
            />
          </div>

          <div className="item next-item">
            <Button
              onClick={handleNext}
              className="secondary-btn small light ml-36 fs-14">
              NEXT
            </Button>
            <div
              className="img next-img"
              style={{
                backgroundImage: `url(images/${right.src || ''})`,
              }}
            />
          </div>
        </div>

        <div className="gradient per-100"> </div>
        <div className="per-100 horizon center">
          <div className="shadow"> </div>
        </div>
      </div>
    )
  })
)
