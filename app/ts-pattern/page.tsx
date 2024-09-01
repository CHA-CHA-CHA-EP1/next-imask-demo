'use client';
import { match } from 'ts-pattern';

const response: 
{
  code: number;
  message: string;
  data: Array<{
    id: number;
    name: string;
    status: "active" | "inactive";
  }>;
}  = {
  code: 200,
  message: "ok",
  data: [
    {
      id: 1,
      name: "John",
      status: "active"
    },
    {
      id: 2,
      name: "Doe",
      status: "inactive"
    }
  ]
}


export default function Page() {

  return (
    <div>
      {response.data.map((item) => (
        <div key={item.id}>
          {match(item.status)
            .with("active", () => <span style={{ color: "green" }}>{item.name}</span>)
            .with("inactive", () => <span style={{ color: "red" }}>{item.name}</span>)
            .exhaustive()
          }
        </div>
      ))
      }
    </div>
  )
}
