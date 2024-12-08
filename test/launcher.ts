// 1. Basic
/*
    import { handler } from "../src/services/hello";
    handler({} as any, {} as any);
*/

// 2. Post spaces
/*
    import { handler } from "../src/services/spaces/handler";
    handler(
    {
        httpMethod: "POST",
        body: JSON.stringify({
        location: "Melbourne",
        }),
    } as any,
    {} as any
    );
*/

// 3. Node
// Run in this launche file with ts node
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
