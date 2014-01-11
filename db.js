var MobileServiceClient = WindowsAzure.MobileServiceClient;
var client = new MobileServiceClient(ENV.APP_URL, ENV.AZURE_APP_KEY);

var WorkspaceTable =  client.getTable('Workspace');