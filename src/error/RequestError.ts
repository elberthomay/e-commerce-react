export class RequestError extends Error {
  errors: any;
  constructor(public status: number, public body: any) {
    super(
      typeof body.message === "string"
        ? body.message
        : `Error ${status} has occured`
    );
    if (body.errors !== undefined) this.errors = body.errors;
  }
}
