import React from 'react';

import './Loading.scss';


class LoadingBig extends React.Component {  
    render() {
        return (
            <div className='loadingsmall'>               
                <div className='loadingsmall__loader'></div>
            </div>
        )
    }


};

export default LoadingBig;