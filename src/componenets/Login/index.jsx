import styles from './style.module.css'
import React from 'react'

const Login = () => {
    return (
        <div id={`${styles.loginDiv}`}>
            <h4>Login</h4>
            <form>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="username" />
                    <label for="floatingInput">User Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>
                <button type="submit" class="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login