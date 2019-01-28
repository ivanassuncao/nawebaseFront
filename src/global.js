import Vue from 'vue'

export const userKey = '__manager_user_store'
export const companykey = '__manager_company_store'
export const baseApiUrl = 'http://localhost:3000'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}


 export default {baseApiUrl, showError, userKey, companykey} 