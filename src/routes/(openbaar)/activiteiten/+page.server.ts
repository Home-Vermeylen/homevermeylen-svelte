export async function load({ fetch, url, locals }) {
    const academiejaar_query = new URL(url).searchParams.get('aj');

    const academiejaren = locals.pb
        .collection('praesidia')
        .getFullList({ fields: 'academiejaar', sort: '-academiejaar' })
        .then(r => r.map(a => a.academiejaar));

    const a = await locals.pb
        .collection('activiteiten')
        .getFullList({
            filter: `praesidium.academiejaar = '${academiejaar_query ?? locals.praesidium?.academiejaar}'`,
            sort: '-datum'
        })
        .then((r) =>
            r.map((a) => ({
                ...a,
                banner: locals.pb.files.getUrl(a, a.banner)
            }))
        );

    const opkomende_activiteiten = a
        .filter((a) => {
            return new Date(a.datum).getTime() >= new Date().getTime();
        })
        .sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());
    const afgelopen_activiteiten = a
        .filter((a) => {
            return new Date(a.datum).getTime() < new Date().getTime();
        })
        .sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime());



    return { activiteiten: { opkomende_activiteiten, afgelopen_activiteiten }, academiejaar: locals.praesidium?.academiejaar, academiejaar_query, academiejaren };
}