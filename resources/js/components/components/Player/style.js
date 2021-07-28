import styled from 'styled-components';

export const PlayerSection = styled.div`
    width: 100%;
    margin-top: 20px;
    padding: 20px 10px 20px 10px;
    background-color: #f3f4f5;
    border-radius: 5px;
`;

export const VideoPlayer = styled.div`
    width: 100%;
    height: 615px;
    border-radius: 5px;
    @media (max-width: 1200px) {
        height: 515px
    }
    @media (max-width: 990px) {
        height: 379px
    }
    @media (max-width: 768px) {
        height: 278px
    }
    @media (max-width: 576px) {
        height: 185px
    }
`;

export const StyledP = styled.p`
    color: black;
    font-size: 1.1rem;
    font-weight: bold;
    margin: 5px 0px;
`;

export const StyledSmall = styled.small`
    color: #6c757d;
    margin-right: 5px;
    display: flex;
    align-items: center;
    svg {
        width: 0.8em;
        height: 0.8em;
    }
`;

export const UserSection = styled.small`
    color: #6c757d;
    margin-right: 5px;
    display: flex;
    cursor: pointer;
    align-items: center;
    svg {
        width: 0.8em;
        height: 0.8em;
    }
    &: hover {
        color: #9146ff;
    }
`;