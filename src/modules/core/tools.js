
var app = {
    storage: {
        arrayToString(array) {
            var arr = array;
            localStorage.arr = arr
            localStorage.arr.toLocaleString();
        },
        set(key, value) {

            localStorage.setItem(key, JSON.stringify(value));
        },
        get(key) {

            var result = localStorage.getItem(key);
            console.log("local___"+result)
            if (result) {

                return JSON.parse(result);
            } else {
                return '';
            }
        },
        remove(key) {
            localStorage.removeItem(key)
        }
    }
}

export default app;