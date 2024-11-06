export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`; //`https://larek-api.nomoreparties.co/api/weblarek`; 
export const CDN_URL =  `${process.env.API_ORIGIN}/content/weblarek`; // `https://larek-api.nomoreparties.co/content/weblarek`; 

//API_TOKEN="e3bd6989-a024-42df-9cf0-cae8bd3b5164"
//Идентификатор группы: wff-cohort-22

export const settings = {
    headers: {
        authorization: `${process.env.API_TOKEN}`,
        'Content-Type': 'application/json'
    },
};
