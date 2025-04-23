export type mediaTypeType="movie" | "series" | "all"

export async function fetchMedia(title: string, mediaType: mediaTypeType) {
    let URL= `${process.env.API_BASE_URL}apikey=${process.env.API_KEY}`
    const currentType = (mediaType === "movie"||mediaType === "series")? `&type=${mediaType}`:""
    console.log(`${URL}&s=${title}${currentType}`)
    const response= await fetch(`${URL}&s=${title}${currentType}`)
    return await response.json()
}
