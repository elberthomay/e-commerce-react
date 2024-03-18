import Button from "../ui/Button";

function ErrorBody() {
  return (
    <div className="flex justify-center items-center mt-6">
      <p>Oops, an error has occurred</p>
      <Button>Return to main page</Button>
    </div>
  );
}

export default ErrorBody;
