function saveCookie(name, value, expire){
    let exp_date = new Date();
    exp_date.setTime(exp_date.getTime() + date2Miliseconds(expire));

    let exp = 'expires=' + exp_date.toUTCString();
    let path = 'path=/';

    document.cookie = name + '=' + escape(value) + ';' + 'SameSite=Lax; Secure;' + exp + ';' + path;
}

function removeCookie(name, path = '/'){
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + path +';'
}

function getCookie(name){
    let cookie_name = name + '=';
    let cookie_str = document.cookie;
    cookie_str = decodeURIComponent(cookie_str);
    let cookies = cookie_str.split(';');

    for (let i = 0; i < cookies.length; i++){
        let cookie = cookies[i];
        cookie = cookie.trim();

        if (cookie.indexOf(cookie_name) == 0) {
            let val = cookie.substring(cookie_name.length, cookie.length);
            val = unescape(val);

            return val;
        }
    }

    return null;
}

function date2Miliseconds(days){
    return days * 24 * 60 * 60 * 1000;
}
