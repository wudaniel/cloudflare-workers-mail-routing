import { IRequest } from "itty-router";

export class MailAddr {
  username: string;
  tag: string | null;
  domain: string;

  constructor(username: string, tag: string | null, domain: string) {
    this.username = username;
    this.tag = tag ? tag : null;
    this.domain = domain;
  };
}

export class Utils {
  static countPlusSigns(inputString: string): number {
    const plusSigns = inputString.match(/\+/g);

    if (plusSigns === null) {
      return 0;
    }
    return plusSigns.length;
  }

  static mailParser(destAddress: string): MailAddr | null {
    const parser = /^(?<username>[a-zA-Z0-9._-]+)(\+(?<tag>[a-zA-Z0-9._-]+|\*))?@(?<domain>[a-zA-Z0-9.-]+)$/
    let match = parser.exec(destAddress)
    if (match === null) {
      return null;
    }
    let groups = match.groups;
    if (groups === undefined) {
      return null;
    }
    return new MailAddr(groups.username, groups.tag, groups.domain)
  }

  static withAuthenticatedUser(request: IRequest, env: Env) {
    let params = request.query.token
    let token = env.token
    if (params !== token) {
      return new Response('Not Found.', { status: 404 })
    }
  }
}