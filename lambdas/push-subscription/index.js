// export const handler = async (event) => {
//   const vapidPrivateKey="Y-UN4iz2NMyQaBtiGyo72KFDZkMKG3DErveEphkC-Qg"
//   const vapidPublicKey="BFfOBZFkjy4654S4qJfqAo-pvTYzLY9OhUFOE04Wix3nJRlOtOKDSOWHm8XD6CslnAUt0dISLXdufpc1LQoWdAw";
  
//   return { statusCode: 200, body: vapidPublicKey }

// };
import webPush from "web-push";

export const handler = async (event) => {
  
  if (event.body !== null && event.body !== undefined) {
        let body = event.body //use in case of JSON body
        
        const subscription = event.body.subscription;
        const payload = event.body.payload;
        const options = {
          TTL: event.body.ttl,
        };
    
        setTimeout(() => {
          webPush
            .sendNotification(subscription, payload, options)
            .then(() => {
              res.sendStatus(201);
            })
            .catch((error) => {
              console.log(error);
              res.sendStatus(500);
            });
        }, event.body.delay * 1000);
  }
  
  
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
