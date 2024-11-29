const getLoginData = () => {
    const LoginData = localStorage.getItem("loginData");
    const parsedData = JSON.parse(LoginData)
    return parsedData;
};


export default getLoginData;
