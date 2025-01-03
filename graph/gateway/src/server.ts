import { ApolloServer } from '@apollo/server'
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda'
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway'
import { RequestHandler } from '@as-integrations/aws-lambda/src/request-handlers/_create'
import { ALBEvent, ALBResult } from 'aws-lambda'
import { serializeQueryPlan } from '@apollo/query-planner'

// const supergraphSdl = readFileSync('./supergraph.graphql').toString()

// const gateway = new ApolloGateway({
//   supergraphSdl,
// })

const gateway = new ApolloGateway({
  experimental_didResolveQueryPlan: function (options) {
    if (options.requestContext.operationName !== 'IntrospectionQuery') {
      // eslint-disable-next-line no-console
      console.log(serializeQueryPlan(options.queryPlan))
    }
  },
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'cart', url: 'http://localhost:4001' },
      // { name: 'order', url: 'http://localhost:4002' },
      // { name: 'product', url: 'http://localhost:4003' },
      // { name: 'shipping', url: 'http://localhost:4004' },
      { name: 'stock', url: 'http://localhost:4005' },
      // { name: 'user', url: 'http://localhost:4006' },
    ],
  }),
})

const server = new ApolloServer({
  gateway,
})

export const handler = startServerAndCreateLambdaHandler<RequestHandler<ALBEvent, ALBResult>>(server, handlers.createALBEventRequestHandler())
