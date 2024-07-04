
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcrypt"


function generatePoolId(n) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < n; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const handler = async (event) => {




  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);

  const password = event.body.password;
  const saltRounds = 10;
  const poolId = generatePoolId(8);

let a = "";

console.log('INCOMING!')
  bcrypt.hash(password, saltRounds).then(function(err, hash) {
    a = hash;
});

//const hashsalt = bcrypt.hashSync(password, saltRounds);

 // bcrypt.hash(password, saltRounds, function (err, hashsalt) {
    const command = new PutCommand({
      TableName: "splashflag",
      Item: {
        PK: `PoolId${poolId}`,
        SK: null,
        Email: event.body.email,
        Password: "hashsalt",
        PoolName: event.body.poolname
      },
    });
  //});

  const response = await docClient.send(command);
  console.log(response);
  return response;

  //const response = {
  //  statusCode: 200,
  //  body: JSON.stringify(event),
  //};
  //return response;
};
