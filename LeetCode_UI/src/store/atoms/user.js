import {atom} from 'recoil';
// const email: string|null =null;
export const userState=atom({
    key:'userState',
    default:{
        userEmail:null
    },
});