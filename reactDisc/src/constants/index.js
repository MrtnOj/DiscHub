const prod = {
    url: {
        API_URL: 'http://localhost:8080/api/'
    }
}

const dev = {
    url: {
        API_URL: 'http://ec2-3-15-42-245.us-east-2.compute.amazonaws.com/api/'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;