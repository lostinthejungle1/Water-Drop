import { gql } from "@apollo/client";

export const sendCodeMsg = gql`
mutation sendCodeMsg($tel: String!){
    sendCodeMsg(tel:$tel)
  }
`