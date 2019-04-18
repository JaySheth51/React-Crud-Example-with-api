import Axios from 'axios';


export const loginAuth = (state, callback) => {
    Axios({

        method: 'post',
        url: 'https://reqres.in/api/login',
        data: {
            email: state.email,
            password: state.password,
        },
    })
        .then((res) => {
            const code = res.status;
            const token = res.data.token;
            localStorage.setItem('token', token );
            console.log('logged in', code, token);
            return callback({ status: true, code });

        })
        .catch(err => {
            if (err.response) {
                return callback(err.response)
            }
        });
};

export default loginAuth;
