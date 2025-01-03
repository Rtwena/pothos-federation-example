import * as fs from 'node:fs'
import { ApolloServer } from '@apollo/server'
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda'
import { RequestHandler } from '@as-integrations/aws-lambda/src/request-handlers/_create'
import { ALBEvent, ALBResult } from 'aws-lambda'
import { lexicographicSortSchema } from 'graphql/utilities'
import { builder } from './builder'
import './schema'
import './resolvers'
import { printSubgraphSchema } from '@apollo/subgraph'

// const builderSchema = builder.toSchema({})

const builderSchema = builder.toSubGraphSchema({
  linkUrl: 'https://specs.apollo.dev/federation/v2.5',
  federationDirectives: ['@key', '@shareable', '@extends', '@external', '@requires'],
})

// write schema to file schema.generated.graphql
const schemaAsString = printSubgraphSchema(lexicographicSortSchema(builderSchema))
fs.writeFileSync('schema.generated.graphql', schemaAsString)

const server = new ApolloServer({
  schema: builderSchema,
})

export const handler = startServerAndCreateLambdaHandler<RequestHandler<ALBEvent, ALBResult>>(server, handlers.createALBEventRequestHandler())
