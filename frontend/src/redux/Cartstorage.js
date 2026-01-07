// This will be used to create unique cart key for each user in local storage.
export const createcartkeyforuser = (userid) => `cart_${userid}`;

export const getcartfromstorage = (userid) => {

    const data = localStorage.getItem(createcartkeyforuser(userid));

    return data ? JSON.parse(data) : {items:[],totalitems:0,totalamount:0};
    
}

export const savecarttostorage = (userid,cartdata) => {

    localStorage.setItem(createcartkeyforuser(userid),JSON.stringify(cartdata));

}

export const removefromcartstorage = (userid) => {

    localStorage.removeItem(createcartkeyforuser(userid));

}