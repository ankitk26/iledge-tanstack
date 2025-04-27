import { useQuery } from "@tanstack/react-query";
import PayeeItem from "./payee-item";
import { payeesQuery } from "~/queries";

export default function PayeeList() {
  const { data, isPending } = useQuery(payeesQuery);

  return (
    <>
      {data?.map((payee) => (
        <PayeeItem key={payee.payeeId + "_admin"} payee={payee} />
      ))}
    </>
  );
}
