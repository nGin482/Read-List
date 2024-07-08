const checkValidFFNURL = (ffn_url: string, name: string) => {
    return (
        ffn_url.includes('https://www.fanfiction.net') &&
        ffn_url.toLowerCase().includes(name.toLowerCase().replace(' ', '-'))
    );
};

const checkValidAO3URL = (ao3_url: string, name: string) => {
    return (
        ao3_url.includes('https://archiveofourown.org') &&
        ao3_url.toLowerCase().includes(encodeURIComponent(name.toLowerCase()))
    );
};

export const validateFandom = (fandom: string, ffn_url: string, ao3_url: string) => {
    if (fandom === '') {
        throw Error('Please provide the name of the fandom');
    }
    if (ffn_url !== '' && !checkValidFFNURL(ffn_url, fandom)) {
        throw Error('This is not a valid Fanfiction.Net URL. Please make sure the URL given is from Fanfiction.Net before submitting.');
    }
    if (ao3_url !== '' && !checkValidAO3URL(ao3_url, fandom)) {
        throw Error('This is not a valid AO3 URL. Please make sure the URL given is from Archive of our Own before submitting.');
    }
    return true;
};
