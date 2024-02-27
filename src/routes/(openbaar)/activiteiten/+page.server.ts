export async function load({fetch}) {
    return { activiteiten: fetch("/api/activiteiten", { method: "GET" }).then(async (data) => { return data.json()}) }
}