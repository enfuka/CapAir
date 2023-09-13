import { Button, Result } from "antd";
import { useRouteError } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Result
      id="error-page"
      status="404"
      title="404"
      subTitle={`Sorry, the page you visited does not exist. Error: ${
        error.statusText || error.message
      }`}
      extra={
        <Button type="primary" href="/">
          Back Home
        </Button>
      }
    />
  );
}
