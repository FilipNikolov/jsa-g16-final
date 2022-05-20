import { useState } from "react";
const Login = () => {
    const formDataInit = {
        email: '',
        password: ''
    };

    const [formData, setFormData] = useState(formDataInit)

    const submit = async (e) => {
        e.preventDefault()
        try {
            let res = await fetch('/api/v1/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'content-type': 'application/json'
                }
            });
            if (!res.ok) {
                throw 'Error loggin in!'
            };
            let data = await res.json();
            localStorage.setItem('jwt', data.token)
        } catch (err) {
            alert(err)
        }
    };
    const inputChange = (e) => {
        // console.log(e)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={submit}>
            <label>
                <span>Username (email)</span>
                <input type="email" name="email" value={formData.email} onChange={inputChange}></input>
            </label>
            <label>
                <span>Password</span>
                <input type="password" name="password" value={formData.password} onChange={inputChange}></input>
            </label>
            <br />
            <br />
            <button type="submit">Login</button>
        </form>
    )
};

export default Login;