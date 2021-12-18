import * as cdk from '@aws-cdk/core';
import * as amplify from "@aws-cdk/aws-amplify";

export class AmplifyInfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyApp = new amplify.App(this, 'hello-amplify', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: '8888',
        repository: 'hello-amplify',
        oauthToken: cdk.SecretValue.secretsManager('gh/pat/hello-amplify', { jsonField: 'pat' }),
      })
    });

    const masterBranch = amplifyApp.addBranch('main');
  }
}
