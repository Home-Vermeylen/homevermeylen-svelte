export const load = async ({ fetch }) => {
    return {
        activiteiten_promise: fetch('/api/activiteiten')
            .then(async (data) => {
                return await data
                    .json()
                    .then((a) => [...a.opkomende_activiteiten, ...a.afgelopen_activiteiten])
                    .then((a) => a.map((a) => ({ ...a, datum: new Date(a.datum) })))
            }),
        augustjes_promise: fetch('/api/augustjes')
            .then(async (data) => {
                return await data.json().then((a) => a.map((a) => ({ ...a, datum: new Date(a.datum) })));
            }),
        verslagen_promise: fetch('/api/verslagen')
            .then(async (data) => {
                return await data.json().then((a) => a.map((a) => ({ ...a, datum: new Date(a.datum) })));
            })
    }
}