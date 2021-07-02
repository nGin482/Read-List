const checkValidURL = url => {
    if (!url.includes('https://')) {
        return false
    }
    else {
        return true
    }
}

const checkValidFFNURL = ffn_url => {
    if (checkValidURL(ffn_url)) {
        if (!ffn_url.includes('fanfiction.net')) {
            return false
        }
        else {
            return true
        }
    }
    else {
        return false
    }
}

const checkValidAO3URL = ao3_url => {
    if (checkValidURL(ao3_url)) {
        if (!ao3_url.includes('archiveofourown.org')) {
            return false
        }
        else {
            return true
        }
    }
    else {
        return false
    }
}

const checkValidationAddFandom = (fandom, ffn_url, ao3_url, search) => {
    if (fandom !== '') {
        if (ffn_url !== '' && ao3_url === '') {
            if (checkValidFFNURL(ffn_url)) {
                if (search !== '') {
                    return {status: true}
                }
                else {
                    return {status: false, message: 'Please specify how many pages you would like to search.'}
                }
            }
            else {
                return {status: false, message: 'This is not a valid Fanfiction.Net URL. Please make sure the URL given is from Fanfiction.Net before submitting'}
            }
        }
        else if (ao3_url !== '' && ffn_url === '') {
            if (checkValidAO3URL(ao3_url)) {
                if (search !== '') {
                    return {status: true}
                }
                else {
                    return {status: false, message: 'Please specify how many pages you would like to search.'}
                }
            }
            else {
                return {status: false, message: 'This is not a valid AO3 URL. Please make sure the URL given is from Archive of our Own before submitting'}
            }
        }
        else if (ffn_url !== '' && ao3_url !== '') {
            const ffn_check = checkValidFFNURL(ffn_url)
            const ao3_check = checkValidAO3URL(ao3_url)
            if (ffn_check && ao3_check) {
                if (search !== '') {
                    return {status: true}
                }
                else {
                    return {status: false, message: 'Please specify how many pages you would like to search.'}
                    
                }
            }
            else if (!ffn_check && ao3_check) {
                return {status: false, message: 'This is not a valid Fanfiction.Net URL. Please make sure the URL given is from Fanfiction.Net before submitting'}
            }
            else if (!ao3_check && ffn_check) {
                return {status: false, message: 'This is not a valid AO3 URL. Please make sure the URL given is from Archive of our Own before submitting'}
            }
            else {
                return {status: false, message: 'The Fanfiction.Net and the Archive of our Own URLs given do not come from their respective sites. Please make sure they are correct URLs before submitting'}
            }
        }
        else {
            return {status: false, message: 'The URL fields must not be blank. Please specify the name of the fandom and provide one or both site URLs.'}
        }
    }
    else {
        return {status: false, message: 'Please specify the name of the fandom before submitting.'}
    }
}

const utilFunctions = {
    checkValidationAddFandom
}

export default utilFunctions;