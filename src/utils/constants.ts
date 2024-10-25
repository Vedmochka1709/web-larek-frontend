export const API_URL = `https://larek-api.nomoreparties.co/api/weblarek`;  // ${process.env.API_ORIGIN}
export const CDN_URL = `https://larek-api.nomoreparties.co/content/weblarek`;  // ${process.env.API_ORIGIN}

//API_TOKEN="e3bd6989-a024-42df-9cf0-cae8bd3b5164"
//Идентификатор группы: wff-cohort-22

export const settings = {
    headers: {
        authorization: `${process.env.API_TOKEN}`,
        'Content-Type': 'application/json'
    },
};
