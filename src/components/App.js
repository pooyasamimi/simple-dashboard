import React, { useState } from 'react';
import Content from './Content';
import Sidebar from './Sidebar';
import { MainContext } from '../contexts/MainContext'

const App = () => {

    const [showMenu, setShowMenu] = useState(function () {
        if (window.innerWidth <= 768) {
            return false
        } else { return true }
    });

    return (
        <div>
            <MainContext.Provider value={{ showMenu, setShowMenu }}>
                <Sidebar />
                <Content />
            </MainContext.Provider>
        </div>
    )
}


export default App;
