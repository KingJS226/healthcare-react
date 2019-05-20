export const loadState = (name) => {

    try {
        const serializedState = localStorage.getItem(name);
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (name, value) => {
    try{
        const serializedState = JSON.stringify(value);
        localStorage.setItem(name, serializedState);
    } catch (err){
        return undefined;
    }
};

export const removeState = (name) => {
    try {
        localStorage.removeItem(name);
    } catch (e) {
        return e;
    }
}