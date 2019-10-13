/* @flow */

import React from 'react'
import { Translate, withLocalize } from 'react-localize-redux'

type TProps = {
	id: string,
	value: string,
	handler: (event: Event) => any,
	pass?: boolean,
}

function LabeledInput({ id, value, handler, pass = false }: TProps): Node {
	const type = pass ? 'password' : 'text'
	return (
		<div className="labeled-input">
			{type === 'password' ? <Translate id="login.password" /> : <Translate id="login.email" />}
			<input id={id} type={type} value={value} onChange={handler} />
		</div>
	)
}

LabeledInput.defaultProps = {
	pass: false,
}

export default withLocalize(LabeledInput)
