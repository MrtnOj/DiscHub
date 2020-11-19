const prod = {
    url: {
        API_URL: 'https://frozen-river-07638.herokuapp.com/api/'
    }
}

const dev = {
    url: {
        API_URL: 'https://frozen-river-07638.herokuapp.com/api/'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;