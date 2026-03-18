import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'
import { notFound } from 'next/navigation'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
  const params = await props.params
  try {
    const { metadata } = await importPage(params.mdxPath)
    return metadata
  } catch {
    return {}
  }
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props) {
  const params = await props.params
  try {
    const result = await importPage(params.mdxPath)
    const { default: MDXContent, toc, metadata } = result
    return (
      <Wrapper toc={toc} metadata={metadata}>
        <MDXContent {...props} params={params} />
      </Wrapper>
    )
  } catch {
    notFound()
  }
}
