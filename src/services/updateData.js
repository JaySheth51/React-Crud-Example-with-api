import Axios from 'axios';


export const updateData = (user, callback) => {
    const token = localStorage.getItem('token');
    console.log('a',user);
    Axios({

        method: 'post',
        url: 'https://reqres.in/api/users/3',
        headers: {
            token: token,
        },
        data: {
            name: user.firs_tname,
            job: user.last_name
        },
    }).then(res => {
        return callback(res)
    })
    .catch(err => {
        if (err.response) {
            return callback(err.response)
        }
    });
};

export default updateData;
