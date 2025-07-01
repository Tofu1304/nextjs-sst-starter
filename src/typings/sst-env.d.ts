/* This file is manually maintained for type safety. Keep in sync with sst.config.ts */
/* tslint:disable */

import "sst";
export {};
declare module "sst" {
  export interface Resource {
    NextEmail: {
      type: "sst.aws.Email";
      sender: string;
    };
    SupportEmail: {
      type: "sst.aws.Email";
      sender: string;
    };
  }
}
