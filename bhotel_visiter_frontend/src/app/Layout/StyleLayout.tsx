import { trpc } from '@helpers'

export const StyleLayout = (props: { children: JSX.Element }) => {
	const { children } = props

	const [getFooterSettings, getHeaderSettings] = trpc.useQueries((t) => [
		t.getFrontendFooter(),
		t.getFrontendHeader('67342c88-fd1e-425b-99b1-3cdc427b914a')
	])

	return { children }
}
