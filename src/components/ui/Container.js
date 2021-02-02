import React from 'react'

const Container = ({first, ...props}) => {
    return (
        <div className={`${first ? 'pt-5' : 'pt-20'} px-5 md:px-10 lg:px-20`}>
            {props.children}
        </div>
    )
}

export default Container
