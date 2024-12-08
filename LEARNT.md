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

Example code at 'src/services/spaces/PostSpacesWithDocDB.ts'

You simply wrap the DynamoDB Client in DynamoBD Document Client: <br>
`const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);`

Then simply send the command like so: `await ddbDocClient.send(command)`
