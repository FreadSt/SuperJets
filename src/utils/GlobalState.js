
export function globalState() {
    const list = [];
    const names = [];
    const setCallback = (name, callback) => {
        if (names.indexOf(name) === -1) {
            console.log("setCallback:", name);
            names.push(name);
            list.push(callback);
        }
    };
    const setValue = async (value) => {
        for (let callback of list) {
            await callback(value);
        }
    }
    return [setCallback, setValue];
}


export const [setLoadJetsCallback, setLoadJetsValue] = globalState();
export const [setUpdateStakingCallback, setUpdateStakingValue] = globalState();