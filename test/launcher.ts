// 1. Basic
/*
    import { handler } from "../src/services/hello";
    handler({} as any, {} as any);
*/

// 2. Post spaces
/*
import { handler } from "../src/services/spaces/handler";
process.env.TABLE_NAME = "SpaceTable-0aec7385babb";
handler(
  {
    httpMethod: "POST",
    body: JSON.stringify({
      location: "Darwin",
      name: "Thang",
    }),
  } as any,
  {} as any
);
*/
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

// 6. Test PUT
/*
import { handler } from "../src/services/spaces/handler";
process.env.TABLE_NAME = "SpaceTable-0aec7385babb";
process.env.AWS_REGION = "eu-west-1";

handler(
  {
    httpMethod: "PUT",
    queryStringParameters: {
      id: "f182a550-8552-4bfd-91f5-f30ee4e2803d",
    },
    body: JSON.stringify({
      location: "New Paris",
    }),
  } as any,
  {} as any
);
*/

// 7. Delete Command
/*
import { handler } from "../src/services/spaces/handler";
process.env.TABLE_NAME = "SpaceTable-0aec7385babb";
process.env.AWS_REGION = "eu-west-1";

handler(
  {
    httpMethod: "DELETE",
    queryStringParameters: {
      id: "96be76d6-e438-4601-aef8-64cee2613b8d",
    },
  } as any,
  {} as any
);
*/
