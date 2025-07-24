class LoginValidation {
    static #valid_credentials = {
        username: "user",
        password: "user123",
    };

    static validateLogin(username, password) {
        if (typeof username !== "string" || typeof password !== "string") {
            return {success: false, message: "Invalid username or password."};
        };

        if(!username.trim() || !password.trim()) {
            return {success: false, message: "Please fill in all fields."}
        };

        if (username === this.#valid_credentials.username &&
            password === this.#valid_credentials.password) {
                return {success: true};
        } else {
            return {success: false, message: "Invalid username or password."}
        };
    }
}

export default LoginValidation;