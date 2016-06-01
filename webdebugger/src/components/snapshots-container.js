import React from 'react'
import cx from 'classnames'
import Snapshot from './snapshot'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this

const propTypes = {
  snapshots: PropTypes.array,
  openSnapshots: PropTypes.object,
  onSnapshotToggle: PropTypes.func.isRequired
}

export default class SnapshotsContainer extends Component {
  render () {
    const { openSnapshots, onSnapshotToggle } = this.props
    const snapshots = this.props.snapshots.map(
      (snapshot, index) => this._prepareSnapshotData(snapshot, this.props.snapshots, index)
    )

    return (
      <ul className="snapshots">
        <h3>Your plugins <span className="counter">{snapshots.length}</span></h3>
        <div className="search_block">
          <input type="text" className="search_block_input" placeholder="Search your plugin" />
        </div>
        {snapshots.map((snapshot, index) =>
          <Snapshot
            key={index} isExpanded={openSnapshots[ index ]}
            onSnapshotToggle={onSnapshotToggle}
            {...{ index, snapshot }}
          />
        )}
      </ul>
    )
  }

  _prepareSnapshotData (snapshot, snapshots, index) {
    return {
      timeDiff: index === 0 ? 0 : snapshot.timestamp - snapshots[ index - 1 ].timestamp,
      afterPluginLabel: snapshot.prevPlugin ? `After ${snapshot.prevPlugin}` : 'Initially',
      highlightedContentHTML: snapshot.highlightedContentHTML,
      content: snapshot.content
    }
  }
}

SnapshotsContainer.propTypes = propTypes
