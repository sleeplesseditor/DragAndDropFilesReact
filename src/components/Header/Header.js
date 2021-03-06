/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import "./Header.css";
import HeaderIcon from '../../img/baseline_menu_white_18dp.png';
import { Link } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 100vw)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
        <h3 className="navbar-heading">
          <Link 
            to={"/"}
            style={{ textDecoration: 'none' }}
          >
            React Drag and Drop
          </Link>
        </h3>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
            <Link 
                to={"/"}
                style={{ textDecoration: 'none' }}
                onClick={toggleNav}
            >
                DropZone
            </Link>
            <Link 
                to={"/dropzone-uploader"}
                style={{ textDecoration: 'none' }}
                onClick={toggleNav}
            >
                DropZone Uploader
            </Link>
            <Link 
                to={"/sortablehoc"}
                style={{ textDecoration: 'none' }}
                onClick={toggleNav}
            >
                Sortable Higher Order Components
            </Link>
            <Link 
                to={"/react-draggable"}
                style={{ textDecoration: 'none' }}
                onClick={toggleNav}
            >
                React Draggable
            </Link>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="header-button">
        <img 
            src={HeaderIcon} 
            alt="HeaderIcon"
        />
      </button>
    </header>
  );
}