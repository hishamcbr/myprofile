import { directive } from 'vue-clickaway'
/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */

const GlobalDirectives = {
    install(Vue) {
        Vue.directive('click-outside', directive)
        Vue.directive('mobile-number', {
            bind(el) {
                el.addEventListener('keypress', (event) => {
                    // console.log(el.value.length)
                    if (event.charCode >= 48 && event.charCode <= 57) {
                        return true
                    } else {
                        event.preventDefault()
                    }
                    // let regex = /^[0-9]*$/
                    // if (!regex.test(el.value)) {
                    //     el.value = el.value.slice(0, -1)
                    // }
                })
            }
        })
        Vue.directive('amount', {
            bind(el) {
                el.addEventListener('keypress', (event) => {
                    // console.log(el.value.length)
                    if (event.charCode >= 48 && event.charCode <= 57) {
                        return true
                    } else {
                        event.preventDefault()
                    }
                    // let regex = /^[0-9]*$/
                    // if (!regex.test(el.value)) {
                    //     el.value = el.value.slice(0, -1)
                    // }
                })
            }
        })
    }
}

export default GlobalDirectives