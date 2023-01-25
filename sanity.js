const sanityClient = require('@sanity/client')
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
  projectId: 'mvti5ism',
  dataset: 'production',
  apiVersion: '2021-10-21', // use a UTC date string
  token: 'skbLqFdJcR70hhZE4gNI6SLBl4ZFaXZRf2qrFGaOkXdSdUJlnHddcZseLauMAC2gYKf92SjLyIMeSF9U1wT7ltUDRH324IsT56UwJ4wNLIP2co2IMWq18uvM02bikFAj6a0yEzhPgjz3n9A5mSgTI0e1kaFrjxARxilJU6N8Xf6HtUO1o0e2', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
export default client

// import sanityClient from "@sanity/client"
// import imageUrl from "@sanity/image-url"

// const client = sanityClient({
//     projectId: "mvti5ism",
//     dataset: "production",
//     useCdn: true,
//     apiVersion: "2021-10-21",
// })

// const builder = imageUrlBuilder(client)

// export const urlFor = (source) => builder.image(source)

// export default client