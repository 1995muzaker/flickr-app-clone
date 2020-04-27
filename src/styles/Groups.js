import styled from "styled-components";

export const MainDiv = styled.div`
  width: 100%;
  display: flex;
`;

export const HeaderDiv = styled.div`
  background: #151517f2;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  box-sizing: border-box;
  & h2 {
    margin: 0;
    font-weight: bold;
    letter-spacing: 1px;
  }
`;

export const FormDiv = styled.form`
  display: flex;
  height: 33px;
  margin: 0;
  margin-right: 9px;
  border-radius: 2px;
  box-sizing: border-box;
  & input {
    background: hsla(0, 0%, 100%, 0.8);
    border: 0;
    padding: 5px;
    font-size: 16px;
    border-radius: 0 3px 3px 0;
    font-family: "Montserrat";
    outline: 0;
  }
  & button {
    background: hsla(0, 0%, 100%, 0.8);
    border: 0;
    padding: 5px 10px;
    border-radius: 3px 0px 0px 3px;
    cursor: pointer;
    outline: 0;
    color: #545454;

    & svg {
      font-size: 19px;
    }
  }
`;

export const GroupDiv = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 70%;
  margin: 24px;
`;

export const GroupCard = styled.div`
  flex: 0 0 32%;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px 10px;
  box-shadow: 0px 0px 5px 2px #c3c3c3;
  & img {
    border-radius: 50%;
    border-style: double;
    width: 60px;
    object-fit: contain;
    padding: 1px;
  }
  & h4 {
    margin: 0;
    font-size: 12pt;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 5px;
  }
  & p {
    margin: 0;
  }
`;

export const ImgDiv = styled.div`
  /* border-radius: 67px;
  border: 1.5px solid;
  padding: 3px;
  height: 59px; */
`;

export const InnerDetails = styled.div`
  width: 100%;
  text-align: left;
  margin-left: 15px;
  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & p {
      margin-right: 10px;
      display: flex;
      align-items: center;
      color: gray;
      font-size: 14px;
      font-weight: 600;
      & svg {
        margin-right: 5px;
      }
    }
  }
`;
