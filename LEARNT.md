# Lecture 44

## Unmarshalling and Marshalling using AWS SDK

Install the SDK with this command:
`npm i @aws-sdk/util-dynamodb`

### Unmarshalling

Unmarshalling works only with single items, not arrays. <br>
Example at: src/services/spaces/GetSpaces.ts, around line 22.

`const unmarshalledItem = unmarshall(getItemResponse.Item);`

### Marshalling

Marshall an item for PutItemCommand like so:

```
Item: marshall({
    id: randomId,
    ...item,
}),
```

Looks much cleaner than:

```
Item: {
    id: {
        S: randomId,
    },
    location: {
        S: item.location,
    },
},
```

## Using DynamoDBDocument Client

Comes from the `aws-sdk/lib-dynamodb`

```
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
```

Example code at 'src/services/spaces/PostSpacesWithDocDB.ts'

You simply wrap the DynamoDB Client in DynamoBD Document Client: <br>
`const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);`

Then simply send the command like so: `await ddbDocClient.send(command)`

# Lecture 45

## Dynamodb update item command - why the expression syntax?

Have a look at the syntax in the UpdateItemCommand, at src/services/spaces/UpdateSpace.ts.

User must write an expression in the 'UpdateExpression' and then define the expression. Like so:
`UpdateExpression: "set #newLoc = :newLocation"`

The `#` symbol represents a placeholder for an attribute name

The `:` symbol represents a placeholder for a value

It seems very verbose so such a simple operation. The answer is that it is to help user deal with reserved words, special characters and SQL injection attacks.
