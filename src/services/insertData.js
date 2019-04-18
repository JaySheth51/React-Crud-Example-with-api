import Axios from 'axios';

export const insertData = (user, callback) => {
    const token = localStorage.getItem('token');
    Axios({

        method: 'post',
        url: 'https://reqres.in/api/users',
        headers: {
            token: token,
        },
        data: {
            name: user.firstname,
            job: user.lastname
        },
    }).then(res => {
        return callback(res)
    })
    .catch(err => {
        if (err.response) {
            return callback(err.response)
        }
    });

}
export default insertData;
