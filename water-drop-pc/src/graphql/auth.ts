import { gql } from "@apollo/client";

export const sendCodeMsg = gql`
mutation sendCodeMsg($tel: String!){
    sendCodeMsg(tel:$tel)
  }
`
export const loginByCode = gql`
mutation loginByCode($tel: String!,$code: String!){
  loginByCode(tel:$tel,code:$code)
}
`;