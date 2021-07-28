import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

export const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #9146ff;
    color: #fff;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    padding: 3px 7px;
`;

export const LogoSearch = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const StyledUl = styled.ul`
    list-style-type: none;
    display: flex;
    padding: 0px;
    margin: 0px 0px 0px 50px;
    li {
        a {
            color: white;
            font-size: 1.1rem;
        }
    }
    @media (max-width: 768px) {
        display: none;
    }
`;

export const StyledSearchIcon = styled.div`
    padding: 5px;
    display: flex;
    color: white;
    align-itmes: center;
    justify-content: center;
`;

export const StyledSearch = styled.div`
    position: relative;
    background-color: white;
    border-radius: 5px;
    margin-left: -155px;
    @media (max-width: 1570px) {
        margin-left: 50px;
    }
    @media (max-width: 768px) {
        margin-left: -50px;
    }
    @media (max-width: 576px) {
        margin-left: 5px;
    }
`;

export const SearchInput = styled(InputBase)`
    padding: 2px;
    padding-left: calc(1em + 1px);
    @media (max-width: 576px) {
        padding-left: 5px !important;
    }
    input {
        transition: width 0.5s;
        width: 300px;
        &:focus {
            width: 400px;
        }
        @media (max-width: 768px) {
            width: 150px!important;
            font-size: 1rem;
        }
        @media (max-width: 576px) {
            width: 100px!important;
            font-size: 1rem;
        }
        @media (max-width: 320px) {
            width: 70px!important;
        }
    }
`;

export const MobileHeader = styled.ul`
    width: 150px;
    top: 0;
    padding: 30px 10px 0px 10px;
    position: fixed;
    height: 100vh;
    transition: margin-left 0.5s;
    z-index: 999;
    list-style-type: none;
    background-color: #2a2929;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    & li {
        color: white;
        &: hover {
            font-weight: bold;
        }
    }
    @media (min-width: 769px) {
        display: none;
    }
`;

export const SearchButton = styled(IconButton)`
    &:focus {
        outline: none!important;
    }
    &>span {
        color: white;
    }
`

export const MobileMenuBtn = styled(IconButton)`
    &:focus {
        outline: none!important;
    }
    @media (min-width: 769px) {
        display: none!important;
    }
`;

export const Layout = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: black;
    opacity: 0.3;
    z-index: 900;
`;

export const LogoSection = styled.div`
    width: 200px;
    @media (max-width: 576px) {
        width: 110px;
    }
`;