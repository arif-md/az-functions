# Infrastructure provisioning for raptor application
## prerequisites
```pwsh
az login --user <myAlias@myCompany.com> --password <myPassword>

az group create -g rg-raptor-dev -l <location>

az deployment group create -g rg-raptor-dev --template-file ./acr/main.bicep --parameters containerRegistryName=raptorcontainerregistry
```

Goto the relevant docker image dir, build the image and push it to the container registry. This image will be pulled automatically during infrastructure provisioning:
```pwsh
cd <docker source code dir>

az acr login --name raptorcontainerregistry

docker build -t raptorcontainerregistry.azurecr.io/raptor:latest ./raptor
docker push raptorcontainerregistry.azurecr.io/raptor:latest
```

Finally, deploy the app service
```pwsh
az deployment group create -g rg-raptor-dev --template-file ./main.bicep
```
