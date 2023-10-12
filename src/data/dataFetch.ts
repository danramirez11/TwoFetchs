export const getCharacters = async (src: string) => {
    try{
    const character = fetch(`${src}`).then(res => res.json());
    return character;
    } catch (error){
        console.log(error)
    }
}

export const getEpisodes = async () => {
    try{
    const allCharacters = fetch("https://rickandmortyapi.com/api/episode").then(res => res.json());
    return allCharacters;
    } catch (error){
        console.log(error)
    }
}
