const checkValidFFNURL = (ffn_url: string) => {
    return ffn_url.includes('https://www.fanfiction.net');
};

const checkValidAO3URL = (ao3_url: string) => {
    return ao3_url.includes('https://archiveofourown.org');
};

export const checkValidationAddFandom = (fandom: string, ffn_url: string, ao3_url: string) => {
    if (fandom === '') {
        throw Error('Please provide the name of the fandom');
    }
    if (ffn_url !== '' && !checkValidFFNURL(ffn_url)) {
        throw Error('This is not a valid Fanfiction.Net URL. Please make sure the URL given is from Fanfiction.Net before submitting.');
    }
    if (ao3_url !== '' && !checkValidAO3URL(ao3_url)) {
        throw Error('This is not a valid AO3 URL. Please make sure the URL given is from Archive of our Own before submitting.');
    }
    return true;
};

const checkValidationUpdateFandom = (field, newData) => {
    if (field === '' && newData === '') {
        return {status: false, message: 'Please select a data item to change and enter new data before submitting.'}
    }
    else if (field === '' && newData !== '') {
        return {status: false, message: 'Please select a data item to change before submitting.'}
    }
    else if (newData === '' && field !== '') {
        return {status: false, message: 'Please enter new data before submitting.'}
    }
    else {
        if (field === 'FFN_URL') {
            if (!checkValidFFNURL(newData)) {
                return {status: false, message: 'This is not a valid Fanfiction.Net URL. Please make sure the URL given is from Fanfiction.Net before submitting.'}
            }
            else {
                return {status: true}
            }
        }
        else if (field === 'AO3_URL') {
            if (!checkValidAO3URL(newData)) {
                return {status: false, message: 'This is not a valid AO3 URL. Please make sure the URL given is from Archive of our Own before submitting.'}
            }
            else {
                return {status: true}
            }
        }
        else if (field === 'search') {
            if (newData === '') {
                return {status: false, message: 'Please specify how many pages to search.'}
            }
            else {
                return {status: true}
            }
        }
        else {
            return {status: true}
        }
    }
}

const utilFunctions = {
    // checkValidationAddFandom,
    checkValidationUpdateFandom
}

export default utilFunctions;