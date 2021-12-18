import { Stack, StackProps } from 'aws-cdk-lib';
import * as amplify from 'aws-cdk-lib/aws-amplify';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export class AmplifyInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // secret is a key value pair { 'pat': 'abc123' }
    // this was manually stored in secrets manager through the console
    const githubPersonalAccessToken = secretsmanager.Secret.fromSecretNameV2(this, 'FromSecretName', 'gh/pat/hello-amplify').secretValue.toJSON()['pat'];

    const amplifyApp = new amplify.App(this, "hello-amplify", {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: '8888',
        repository: 'hello-amplify',
        oauthToken: githubPersonalAccessToken,
      }),
    });
  }
}
