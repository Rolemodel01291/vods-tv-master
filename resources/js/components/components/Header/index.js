import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import {
  StyledDiv,
  StyledUl,
  StyledSearchIcon,
  StyledSearch,
  SearchInput,
  LogoSearch,
  MobileHeader,
  MobileMenuBtn,
  SearchButton,
  Layout,
  LogoSection
} from "./style";
import { useHistory } from "react-router-dom";
import Logo from '../../assets/vods-logo.png'

const Header = () => {
  const history = useHistory()
  const [openMenu, setOpenMenu] = useState(false)
  const [sidebarMargin, setSidebarmargin] = useState("-150px")
  const [searchVal, setSearchVal] = useState('')

  const sidebarDisplay = (menu, margin) => {
    setOpenMenu(menu)
    setSidebarmargin(margin)
  }

  const searchNavigate = (evt) => {
    if (evt.key === "Enter") {
      history.push(`/twitch/search?q=${searchVal}`)
      setSearchVal('')
    }
  }

  const navigation = (url) => {
    setOpenMenu(false)
    setSidebarmargin("-150px")
    history.push(url)
  }
  return (
    <>
      <StyledDiv>
        <LogoSearch>
          <LogoSection>
            <Link to="/"><img src={Logo} alt="Logo" className="w-100" /></Link>
          </LogoSection>
          <StyledUl>
            <li><Link to={'/'} className="nav-link">Trending</Link></li>
            <li><Link to={'/twitch/mostViewed'} className="nav-link">Most Viewed</Link></li>
            <li><Link to={'/twitch/longest'} className="nav-link">Longest</Link></li>
          </StyledUl>
        </LogoSearch>
        <div className="d-flex align-items-center">
          <StyledSearch>
            <SearchInput
              placeholder="Search streamers, games..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchVal}
              onChange={(evt) => setSearchVal(evt.target.value)}
              onKeyDown={searchNavigate}
            />
          </StyledSearch>
          <StyledSearchIcon onClick={() => history.push(`/twitch/search?q=${searchVal}`)}>
            <SearchButton>
              <SearchIcon />
            </SearchButton>
          </StyledSearchIcon>
        </div>
        <StyledUl>
          <li><Link to={'/twitch/streamers'} className="nav-link">Streamers</Link></li>
          <li><Link to={'/twitch/games'} className="nav-link">Games</Link></li>
          <li><Link to={'/twitch/about'} className="nav-link">About Us</Link></li>
        </StyledUl>
        <MobileMenuBtn onClick={() => sidebarDisplay(!openMenu, '0px')}>
          {
            openMenu ? <ClearRoundedIcon style={{ color: "white" }} /> : <MenuRoundedIcon style={{ color: "white" }} />
          }

        </MobileMenuBtn>
      </StyledDiv>
      <MobileHeader style={{ marginLeft: sidebarMargin }}>
        <div className="d-flex justify-content-end">
          <SearchButton onClick={() => sidebarDisplay(!openMenu, '-150px')}>
            <ClearRoundedIcon style={{ color: "white" }} />
          </SearchButton>
        </div>
        <li className="nav-link" onClick={() => navigation('/')}>Trending</li>
        <li className="nav-link" onClick={() => navigation('/twitch/mostViewed')}>Most Viewed</li>
        <li className="nav-link" onClick={() => navigation('/twitch/longest')}>Longest</li>
        <li className="nav-link" onClick={() => navigation('/twitch/streamers')}>Streamers</li>
        <li className="nav-link" onClick={() => navigation('/twitch/games')}>Games</li>
        <li className="nav-link" onClick={() => navigation('/twitch/about')}>About Us</li>
      </MobileHeader>
      {
        openMenu ?
          <Layout onClick={() => sidebarDisplay(false, '-150px')} />
          : ''
      }

    </>
  )
}

export default Header