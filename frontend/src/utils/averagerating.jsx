export const getaveragerating = (ratingarray) => {

    if (!Array.isArray(ratingarray) || ratingarray.length === 0) {

        return 0;
        
    }

    const totalratingsum = ratingarray.reduce((acc,curr) => acc + curr.rating,0);

    const averagerating = Math.round((totalratingsum / ratingarray.length) * 10) / 10;

    return averagerating;
    
}