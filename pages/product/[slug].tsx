import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales }
  const { pages } = await commerce.getAllPages({ config, preview })
  const { product } = await commerce.getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })
  const { categories } = await commerce.getSiteInfo({ config, preview })

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      pages,
      product,
      categories,
    },
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { products } = await commerce.getAllProducts()

  const topProducts = products.filter((p) => p.price.value < 20)
  console.log(topProducts)
  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          topProducts.forEach((product) => {
            arr.push(`/${locale}/product${product.path}`)
          })
          return arr
        }, [])
      : topProducts.map((product) => `/product${product.path}`),
    fallback: 'blocking',
  }
}

export default function Slug({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <ProductView product={product as any} />
  )
}

Slug.Layout = Layout
