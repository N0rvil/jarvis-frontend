import React from 'react';

import './Loading.scss';


class LoadingNormal extends React.Component {
    render() {
        return (
            <div className='loadingnormal'>               
                <div className='loadingnormal__loader'></div>
            </div>
        )
    }


};

export default LoadingNormal;