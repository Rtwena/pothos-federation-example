import SchemaBuilder from '@pothos/core'
import DirectivePlugin from '@pothos/plugin-directives'
import FederationPlugin from '@pothos/plugin-federation'

export const builder = new SchemaBuilder<{
  DefaultFieldNullability: false
}>({
  defaultFieldNullability: false,
  plugins: [DirectivePlugin, FederationPlugin],
})
// If you want to isolate a field out, you would use this type to get full type-scripting info
// export type PothosFieldType<ParentType> = ObjectFieldBuilder<PothosSchemaTypes.ExtendDefaultTypes<UserSchemaType>, ParentType>

// We create empty root query, mutation, and subscription
// because we'll define individual nodes in other files
// since those nodes can have multiple resolvers and possibly
// can lead to really large and hard to read/navigate files
builder.queryType({})
// builder.mutationType({})
// builder.subscriptionType({})
