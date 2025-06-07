// frontend/src/components/Layout/MainLayout.tsx
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from './MainLayout.module.css';


const sidebarClosedWidth = "70px";
const sidebarOpenWidth = "260px";


const MainLayout = ({ children }) => {
    return (
        <div className={styles.appFrame}>
            <Sidebar />
            <div className={styles.mainArea}>
                <Topbar />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;