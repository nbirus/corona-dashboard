import copy from 'copy-to-clipboard'
import store from '@/store'
import { abbreviate } from '@/services/FilterService'

export default function(value, successText) {
	try {
		// copy value
		copy(value)

		// set snackbar
		store.dispatch('snackbar/open', {
			message: successText || `<b>${abbreviate(value, 40)}</b> was copied to your clipboard`,
		})
	} catch (e) {
		// log error to console
		console.error(e)

		// set snackbar
		store.dispatch('snackbar/open', {
			message: `<b>Copy failed!</b> Please try again.`,
			color: 'error',
		})
	}
}
