import styled from "styled-components";

export const MansoryDiv = styled.div`
  columns: 4;
  column-gap: 16px;
  padding: 50px;
  @media (max-width: 1200px) {
    columns: 3;
  }
  @media (max-width: 992px) {
    columns: 2;
  }
  .grid {
    display: inline-block;
    margin-bottom: 16px;
    position: relative;
    &:before {
      border-radius: 5px;
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.2);
    }
    img {
      width: 100%;
      border-radius: 5px;
    }
    &__title {
      font-size: 18px;
      font-weight: 500;
      margin: 0px 0px;
      text-align: left;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-decoration: underline;
      margin-bottom: 5px;
      word-break: break-all;
    }
    &__author {
      text-transform: capitalize;
      font-size: 12px;
      font-weight: 500;
      margin: 0;
      text-align: left;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    &__link {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    &__body {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 10px;
      color: #fff;
      display: flex;
      flex-direction: column;
    }
    &__tag {
      background-color: rgba(0, 0, 0, 0.35);
      color: #333;
      border-radius: 5px;
      padding: 5px 15px;
      margin-bottom: 5px;
    }
    & .parent-inner {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: 100%;
      & .inner-div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: auto;
        background: #000000a3;
        border-radius: 3px;
        width: 100%;
        padding: 10px;
      }
      & .author-div {
        display: flex;
        align-items: center;
        & span {
          text-transform: capitalize;
          font-size: 12px;
          font-weight: 500;
          margin: 0;
          text-align: left;
        }
      }
      & .update p {
        font-size: 12px;
        font-weight: 500;
        margin: 0;
        text-align: right;
      }
    }
  }
`;
