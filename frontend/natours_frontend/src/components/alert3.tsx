import { Alert, AlertTitle } from "@/components/ui/alert";
import { DangerTriangle, InfoCircle } from "@mynaui/icons-react";

export default function Alert3() {
  return (
    <>
      <Alert>
        <InfoCircle className="size-4" />
        <AlertTitle>You have a new invoice due.</AlertTitle>
      </Alert>
      <Alert variant="destructive">
        <DangerTriangle className="size-4" />
        <AlertTitle>Something went wrong with your submission.</AlertTitle>
      </Alert>
    </>
  );
}
