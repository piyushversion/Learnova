export function sectomin(seconds){

    const min = seconds/60;

    return min.toFixed(1);

}

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

export const getTimeAgo = (dateString) => {

  const createdDate = new Date(dateString);
  const now = new Date();
  const diffMs = now - createdDate;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffYear >= 1) return diffYear === 1 ? "1 year ago" : `${diffYear} years ago`;
  if (diffMonth >= 1) return diffMonth === 1 ? "1 month ago" : `${diffMonth} months ago`;
  if (diffWeek >= 1) return diffWeek === 1 ? "1 week ago" : `${diffWeek} weeks ago`;
  if (diffDay >= 1) return diffDay === 1 ? "1 day ago" : `${diffDay} days ago`;
  if (diffHour >= 1) return diffHour === 1 ? "1 hour ago" : `${diffHour} hours ago`;
  if (diffMin >= 1) return diffMin === 1 ? "1 minute ago" : `${diffMin} minutes ago`;

  return "Just now";

}