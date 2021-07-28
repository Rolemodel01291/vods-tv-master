import styled from 'styled-components';

export const StyledP = styled.p`
    color: black;
    font-size: 1.1rem;
    font-weight: bold;
    margin: 5px 0px;
    word-wrap: break-word;
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

export const StyledSpan = styled.span`
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
    font-size: 0.8rem;
    background-color: rgb(0 0 0 / 50%);
    padding: 3px 5px;
    border-radius: 3px;
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
