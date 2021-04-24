import React from 'react';

import './Loading.scss';


class LoadingPage extends React.Component {  
    render() {
        return (
            <div className='loadingpage'>               
                <div className='loadingpage__loader'></div>
            </div>
        )
    }


};

export default LoadingPage;