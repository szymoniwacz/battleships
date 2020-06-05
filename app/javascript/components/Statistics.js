import React, { Fragment } from "react"
import PropTypes from "prop-types"

const Statistics = ({ hits, misses, left, sunk }) => (
  <Fragment>
    hits: { hits } | misses: { misses } | left: { left } | sunk: { sunk }
  </Fragment>
)

Statistics.propTypes = {
  hits: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  misses: PropTypes.number.isRequired,
  sunk: PropTypes.number.isRequired,
}

export default Statistics
