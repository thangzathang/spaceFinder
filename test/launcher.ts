// 1. Basic
/*
    import { handler } from "../src/services/hello";
    handler({} as any, {} as any);
*/

// 2. Post spaces

import { handler } from "../src/services/spaces/handler";
process.env.TABLE_NAME = "SpaceTable-0aec7385babb";
handler(
  {
    httpMethod: "POST",
    body: JSON.stringify({
      location: "Tokyo",
    }),
  } as any,
  {} as any
);

// 3. Test POST with Node ts node
// NOTE: You may need to install ts-node globally. Use `npm install -g ts-node`
// Run in this launcher file with ts node
/*
  import { handler } from "../src/services/spaces/handler";

  process.env.TABLE_NAME = "SpaceTable-0aec7385babb";
  process.env.AWS_REGION = "eu-west-1";

  handler(
    {
      httpMethod: "POST",
      body: JSON.stringify({
        location: "Sydney",
      }),
    } as any,
    {} as any
  );
*/

// 4. Test GET with ts-node
/*
  import { handler } from "../src/services/spaces/handler";
  process.env.TABLE_NAME = "SpaceTable-0aec7385babb";
  process.env.AWS_REGION = "eu-west-1";

  handler(
    {
      httpMethod: "GET",
    } as any,
    {} as any
  );
*/

// 5. Test GET with string query with ts-node
/*
import { handler } from "../src/services/spaces/handler";
process.env.TABLE_NAME = "SpaceTable-0aec7385babb";
process.env.AWS_REGION = "eu-west-1";

handler(
  {
    httpMethod: "GET",
    queryStringParameters: {
      id: "cbf74253-fbf1-4833-9693-067bc4835be6",
    },
  } as any,
  {} as any
);
*/
