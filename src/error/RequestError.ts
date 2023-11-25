export class RequestError extends Error {
  constructor(public status: number, public body: any) {
    super(`Error ${status} has occured`);
  }
}
