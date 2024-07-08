
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const handler = async (event) => {

  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);

  const password = event.body.password;

  const input = {
    TableName: "splashflag",
    Key: {
      "<keys>": {
        S: `PoolId#${poolId}`,
        S: ""
      },
      AttributesToGet: [
        ""
      ]
    }
  };

  const response = await docClient.send(command);
  // TODO: Replace with correct code for DynamoDB errors
  if (response != "ERROR") {
    let httpResponse = {
      statusCode: 200,
      body: JSON.stringify(event),
    };
    return httpResponse;
  } else {
    let httpResponse = {
      statusCode: 200,
      body: JSON.stringify(event),
    };
    return httpResponse;
  }
};