import React from 'react'
import cx from 'classnames'
import PluginDocLink from './plugin-doc-link'
import './snapshot.css'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this

const propTypes = {
  index: PropTypes.number.isRequired,
  isExpanded: PropTypes.bool,
  snapshot: PropTypes.object.isRequired,
  onSnapshotToggle: PropTypes.func.isRequired
}

function Snapshot ({ snapshot, index, isExpanded, onSnapshotToggle }) {
  const pluginLabel = snapshot.prevPlugin ? `After ${snapshot.prevPlugin}` : 'Initially'

  return (
    <li className={cx('selectable ', isExpanded && 'selected','snapshot__item')}>
      <h3 className="snapshot__basename clickable" onClick={() => onSnapshotToggle(index)}>
        <img className="icon_heading" src="./assets/triangle_bot.svg" />
        <span className="snapshot__after-plugin">{pluginLabel}</span>
        {index > 0 ? <SnapshotMeta snapshot={snapshot} /> : null}
      </h3>
      <SnapshotContent snapshot={snapshot} />
    </li>
  )
}

Snapshot.propTypes = propTypes

function SnapshotMeta ({ snapshot }) {
  const onClick = (event) => event.stopPropagation()    // So clicking the PluginDocLink won't open the snapshot content
  return (
    <div className="snapshot__helper_block">
      <PluginDocLink plugin={snapshot.prevPlugin} onClick={onClick} />
      <span className="snapshot__timing">{snapshot.timeDiff} ms</span>
    </div>
  )
}

function SnapshotContent ({ snapshot }) {
  if (snapshot.highlightedContentHTML) {
    const innerHTML = { __html: snapshot.highlightedContentHTML }
    return <div className="snapshot__content" dangerouslySetInnerHTML={innerHTML}></div>
  } else {
    return <pre className="snapshot__content">{snapshot.content}</pre>
  }
}

export default Snapshot
