
## Install
1. [Node](https://nodejs.org/en/download)
2. `npm install -g pnpm`
3. [Python](https://www.python.org/downloads/)
4. [Docker Desktop](https://docs.docker.com/desktop/install/)
5. [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
6. [GCP cli](https://cloud.google.com/sdk/docs/install)

## Available Scripts

Backend API (Python) and Front End (React) both run in docker via docker-compose.yaml.

Run `make` to see all available commands.

## Deployment to GCP with terraform

```bash
gcloud auth application-default login
terraform init
terraform plan
terraform apply --auto-approve
```
