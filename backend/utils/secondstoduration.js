
export function sectodur(seconds) {

    const hrs = Math.floor(seconds / 3600);

    const min = Math.floor((seconds % 3600) / 60);

    const sec = Math.floor((seconds % 3600) % 60);

    if(hrs > 0){

        return `${hrs}hr ${min}mins`

    } else if(min > 0){

        return `${min}mins ${sec}secs`

    } else{

        return `${sec}secs`

    }

}