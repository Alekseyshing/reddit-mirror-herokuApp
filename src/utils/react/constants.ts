export const CARD_LIST_REF = 'https://www.reddit.com/r/popular/best.json?sr_detail=true&limit=10';
export const USER_BLOCK_REF = `https://www.reddit.com/api/v1/authorize?client_id=${process?.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=${process?.env.REDIRECT_URI}&duration=permanent&scope=read submit identity`;
