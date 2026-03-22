/**
 * Jonas uses the Slugify package but nah, too much bloat
 */

export const slugify = (string)=>{
	return String(string).split(" ").join("-").toLowerCase();
}