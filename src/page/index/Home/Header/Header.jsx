import './Header.scss';


import React from 'react';

import SearchBar from '../SearchBar/SearchBar';

/**
 * @constructor <Header />
 * @description 顶部banner
 */

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="header">
                <SearchBar />
                <img className="banner-img" src="https://p1.meituan.net/300.0/hoteltdc/131e4f70f8eac0d19ea6b3e672c285b3167397.jpg"/>
            </div>
        );
    }
}

export default Header;