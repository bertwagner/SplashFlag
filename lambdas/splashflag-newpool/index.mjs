
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
  let hashedPassword = await bcrypt.hash(password, saltRounds);

  const command = new PutCommand({
    TableName: "splashflag",
    Item: {
      PK: `PoolId#${poolId}`,
      SK: poolId,
      Email: event.body.email,
      Password: hashedPassword,
      PoolName: event.body.poolname
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;

  //const response = {
  //  statusCode: 200,
  //  body: JSON.stringify(event),
  //};
  //return response;
};


// let oldhash="$2b$10$p0BWb6wkdq1smdnmQc2Jm.c6A/naYMT.JnarvkL8knZQOddJc/Ety";

//       bcrypt.compare(password+"a",oldhash).then((result,err) => {
//         console.log('result:',result);
//         console.log('error:',err);
//       });