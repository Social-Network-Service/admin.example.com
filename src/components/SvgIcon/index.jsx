import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'

export const SvgIcon = (props) => {
    const {name, className} = props
    const iconName = `#icon-${name}`

    return (
        <svg className={[styles['svg-icon'], className].filter(Boolean).join(' ')} aria-hidden='true'>
            <use xlinkHref={iconName}/>
        </svg>
    )
}

SvgIcon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string
}