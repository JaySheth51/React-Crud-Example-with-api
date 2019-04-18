import Axios from 'axios';


export const getData = (callback) => {
    const token = localStorage.getItem('token');

    Axios({

        method: 'get',
        url: 'https://reqres.in/api/users?page=2',
        headers: {
            token: token,
        },
    })
        .then((res) => {
            const records = res.data.data;
            return callback(records);
        })
        .catch(err => {
            if (err.response) {
                return callback(err.response)
            }
        });
};

export default getData;
